using GraphQL;
using GraphQL.Types;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Queries
{
    public class TestPermissionQuery: ObjectGraphType
    {
        public TestPermissionQuery(IPermissionsService permissionsService)
        {
            Field<StringGraphType>("name").Resolve(context =>
            {
                if (true)
                {
                    context.Errors.Add(new ExecutionError("Unauthorized."));
                }

                int userId = 0;

                if(!permissionsService.HasRequiredPermission(userId, Permissions.READ_TEST_QUERY))
                {
                    context.Errors.Add(new ExecutionError("Persmission denied."));
                }

                return "Hello! You have required persmission";
            });
        }
    }
}
