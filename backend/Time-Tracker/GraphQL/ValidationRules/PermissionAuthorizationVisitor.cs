using GraphQL.Types;
using GraphQL;
using GraphQL.Validation;
using GraphQLParser.AST;
using Time_Tracker.GraphQL.Extensions;

namespace Time_Tracker.GraphQL.ValidationRules
{
    public partial class PermissionAuthorizationRule
    {
        private class PermissionAuthorizationVisitor : INodeVisitor
        {
            private readonly bool _authenticated;
            private readonly int? _userId;
            private readonly List<string> _userPermissions;
            private readonly bool _exposeRequiredPermissions;
            private bool _validate = false;

            public PermissionAuthorizationVisitor(bool authenticated, int? userId, List<string> userPermissions, bool exposeRequiredPermissions)
            {
                _authenticated = authenticated;
                _userId = userId;
                _userPermissions = userPermissions;
                _exposeRequiredPermissions = exposeRequiredPermissions;
            }

            public async ValueTask EnterAsync(ASTNode node, ValidationContext context)
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
            }

            public async ValueTask LeaveAsync(ASTNode node, ValidationContext context)
            {
                if (node is GraphQLOperationDefinition || node is GraphQLFragmentDefinition)
                    _validate = false;
            }

            private async ValueTask AuthorizeAsync(ASTNode? node, IProvideMetadata? metadata, ValidationContext context)
            {

                if (metadata != null && metadata.RequiresPermissions())
                {

                    if (!_authenticated)
                    {
                        context.ReportError(new ValidationError(
                            context.Document.Source,
                            "6.1.1", // the rule number of this validation error corresponding to the paragraph number from the official specification
                  $"Authorization is required to access {context.Operation.Name}.",
                  context.Operation)
                        { Code = "auth-required" });

                        return;
                    }


                    var authorized = metadata.CanAccess(_userPermissions);
                    var requiredPermissions = string.Join(" ", metadata.GetRequiredPermissions(_userPermissions));

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
}
