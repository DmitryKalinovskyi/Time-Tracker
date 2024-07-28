using GraphQL.Server.Transports.AspNetCore;
using GraphQL;
using GraphQL.Validation;
using GraphQLParser.AST;
using Microsoft.AspNetCore.Authorization;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using Time_Tracker.GraphQL.Extensions;
using Time_Tracker.Models;
using Time_Tracker.Services;
using GraphQL.Server.Transports.AspNetCore.Errors;
using Time_Tracker.Repositories;
using Azure;
using GraphQL.Types;
using GraphQLParser;
using Time_Tracker.Helpers;

namespace Time_Tracker.GraphQL.ValidationRules
{
    public class PermissionAuthorizationRule : IValidationRule
    {
        private readonly IPermissionsService _permissionsService;

        private readonly bool _exposeRequiredPermissions;

        public PermissionAuthorizationRule(IConfiguration configuration, IPermissionsService permissionsService)
        {
            _permissionsService = permissionsService;
            _exposeRequiredPermissions = bool.Parse(configuration["Authorization:ExposeRequiredPermissions"] ?? "false");
        }

        public async ValueTask<INodeVisitor?> ValidateAsync(ValidationContext context)
        {
            var user = context.User
            ?? throw new InvalidOperationException("User could not be retrieved from ValidationContext. Please be sure it is set in ExecutionOptions.User.");
            var provider = context.RequestServices
                ?? throw new MissingRequestServicesException();
            var authService = provider.GetService<IAuthorizationService>()
                ?? throw new InvalidOperationException("An instance of IAuthorizationService could not be pulled from the dependency injection framework.");

            var authenticated = context.User?.Identity?.IsAuthenticated ?? false;
            var userPermissions = _permissionsService.GetPermissions(context.User?.GetUserId() ?? 0);

            bool _validate = false;
            return new MatchingNodeVisitor<ASTNode>(async (node, context) =>
                {
                    if ((node is GraphQLOperationDefinition astType && astType == context.Operation) ||
                    (node is GraphQLFragmentDefinition fragment && (context.GetRecursivelyReferencedFragments(context.Operation)?.Contains(fragment) ?? false)))
                    {
                        var type = context.TypeInfo.GetLastType();
                        await AuthorizeAsync(node, type, context, authenticated, userPermissions).ConfigureAwait(false);
                        _validate = true;
                    }

                    if (!_validate)
                        return;

                    if (node is GraphQLObjectField objectFieldAst &&
                        context.TypeInfo.GetArgument()?.ResolvedType?.GetNamedType() is IComplexGraphType argumentType)
                    {   
                        var fieldType = argumentType.GetField(objectFieldAst.Name);
                        await AuthorizeAsync(objectFieldAst, fieldType, context, authenticated, userPermissions).ConfigureAwait(false);
                    }

                    if (node is GraphQLField fieldAst)
                    {
                        var fieldDef = context.TypeInfo.GetFieldDef();

                        if (fieldDef == null)
                            return;

                        // check target field
                        await AuthorizeAsync(fieldAst, fieldDef, context, authenticated, userPermissions).ConfigureAwait(false);
                        // check returned graph type
                        await AuthorizeAsync(fieldAst, fieldDef.ResolvedType?.GetNamedType(), context, authenticated, userPermissions).ConfigureAwait(false);
                    }

                    if (node is GraphQLVariable variableRef)
                    {
                        if (context.TypeInfo.GetArgument()?.ResolvedType?.GetNamedType() is not IComplexGraphType variableType)
                            return;

                        await AuthorizeAsync(variableRef, variableType, context, authenticated, userPermissions).ConfigureAwait(false);

                        // Check each supplied field in the variable that exists in the variable type.
                        // If some supplied field does not exist in the variable type then some other
                        // validation rule should check that but here we should just ignore that
                        // "unknown" field.
                        if (context.Variables != null &&
                            context.Variables.TryGetValue(variableRef.Name.StringValue, out object? input) && //ISSUE:allocation
                            input is Dictionary<string, object> fieldsValues)
                        {
                            foreach (var field in variableType.Fields)
                            {
                                if (fieldsValues.ContainsKey(field.Name))
                                {
                                    await AuthorizeAsync(variableRef, field, context, authenticated, userPermissions).ConfigureAwait(false);
                                }
                            }
                        }
                    }
                },
                async (node, context) =>
                {
                    if (node is GraphQLOperationDefinition || node is GraphQLFragmentDefinition)
                        _validate = false;
                }
            
            );
        }

        private async ValueTask AuthorizeAsync(ASTNode? node, IProvideMetadata? metadata, ValidationContext context, bool authenticated, List<string> userPermissions)
        {

            if(metadata != null && metadata.RequiresPermissions())
            {

                if (!authenticated)
                {
                    context.ReportError(new ValidationError(
                        context.Document.Source,
                        "6.1.1", // the rule number of this validation error corresponding to the paragraph number from the official specification
              $"Authorization is required to access {context.Operation.Name}.",
              context.Operation)
                    { Code = "auth-required" });

                    return;
                }


                var authorized = metadata.CanAccess(userPermissions);
                var requiredPermissions = string.Join(" ", metadata.GetRequiredPermissions(userPermissions));

                if (!authorized)
                {
                    context.ReportError(new ValidationError(
                        context.Document.Source,
                        "authorization",
                    $"You are not authorized to run this {context.Operation.Operation.ToString().ToLower()}. " +
                    (_exposeRequiredPermissions ? $"Required permissions: {requiredPermissions}" : "")
                    ,
                    node == null ? [] : [node]
                        ));

                    return;
                }
            }
        }
    }
}
