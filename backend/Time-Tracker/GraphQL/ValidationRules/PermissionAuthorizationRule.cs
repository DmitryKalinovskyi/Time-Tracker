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
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Time_Tracker.GraphQL.ValidationRules
{
    public class PermissionAuthorizationRule(IPermissionsService permissionsService) : IValidationRule
    {
        public async ValueTask<INodeVisitor?> ValidateAsync(ValidationContext context)
        {
            var user = context.User
            ?? throw new InvalidOperationException("User could not be retrieved from ValidationContext. Please be sure it is set in ExecutionOptions.User.");
            var provider = context.RequestServices
                ?? throw new MissingRequestServicesException();
            var authService = provider.GetService<IAuthorizationService>()
                ?? throw new InvalidOperationException("An instance of IAuthorizationService could not be pulled from the dependency injection framework.");

            bool _validate = false;
            return new MatchingNodeVisitor<ASTNode>(async (node, context) =>
                {
                    if ((node is GraphQLOperationDefinition astType && astType == context.Operation) ||
                    (node is GraphQLFragmentDefinition fragment && (context.GetRecursivelyReferencedFragments(context.Operation)?.Contains(fragment) ?? false)))
                    {
                        var type = context.TypeInfo.GetLastType();
                        await AuthorizeAsync(node, type, context).ConfigureAwait(false);
                        _validate = true;
                    }

                    if (!_validate)
                        return;

                    if (node is GraphQLObjectField objectFieldAst &&
                        context.TypeInfo.GetArgument()?.ResolvedType?.GetNamedType() is IComplexGraphType argumentType)
                    {   
                        var fieldType = argumentType.GetField(objectFieldAst.Name);
                        await AuthorizeAsync(objectFieldAst, fieldType, context).ConfigureAwait(false);
                    }

                    if (node is GraphQLField fieldAst)
                    {
                        var fieldDef = context.TypeInfo.GetFieldDef();

                        if (fieldDef == null)
                            return;

                        // check target field
                        await AuthorizeAsync(fieldAst, fieldDef, context).ConfigureAwait(false);
                        // check returned graph type
                        await AuthorizeAsync(fieldAst, fieldDef.ResolvedType?.GetNamedType(), context).ConfigureAwait(false);
                    }

                    if (node is GraphQLVariable variableRef)
                    {
                        if (context.TypeInfo.GetArgument()?.ResolvedType?.GetNamedType() is not IComplexGraphType variableType)
                            return;

                        await AuthorizeAsync(variableRef, variableType, context).ConfigureAwait(false);

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
                                    await AuthorizeAsync(variableRef, field, context).ConfigureAwait(false);
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

        private async ValueTask AuthorizeAsync(ASTNode? node, IProvideMetadata? metadata, ValidationContext context)
        {

            if(metadata != null && metadata.RequiresPermissions())
            {
                var authenticated = context.User?.Identity?.IsAuthenticated ?? false;

                if (!authenticated)
                {
                    context.ReportError(new ValidationError(
                        context.Document.Source,
                        "authorization",
                    $"You are not authorized to run this {context.Operation.Operation.ToString().ToLower()}.",
                    node == null ? [] : [node]
                        ));

                    return;
                }

                var userPermissions = permissionsService.GetPermissions(context.User?.GetUserId() ?? 0);

                var authorized = metadata.CanAccess(userPermissions);
                if (!authorized)
                {
                    context.ReportError(new ValidationError(
                        context.Document.Source,
                        "authorization",
                    $"You are not authorized to run this {context.Operation.Operation.ToString().ToLower()}.",
                    node == null ? [] : [node]
                        ));

                    return;
                }
            }
        }
    }
}
