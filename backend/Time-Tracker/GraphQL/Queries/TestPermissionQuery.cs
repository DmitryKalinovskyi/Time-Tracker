using GraphQL;
using GraphQL.Types;
using System.Security.Claims;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Queries
{
    public class TestPermissionQuery: ObjectGraphType
    {
        public TestPermissionQuery(IPermissionsService permissionsService)
        {
            Field<StringGraphType>("test").Resolve(context =>
            {
                int userId = -1;

                if(context.User is ClaimsPrincipal principal)
                {
                    userId = int.Parse(principal.Claims.First().Value);
                }

                if (userId == -1) throw new ExecutionError("Unauthenticated");

                if(!permissionsService.HasRequiredPermission(userId, Permissions.READ_TEST_QUERY))
                {
                    throw new ExecutionError("Unauthorized");
                }

                return "Hello from test permission query!";
            });
        }
    }
}
