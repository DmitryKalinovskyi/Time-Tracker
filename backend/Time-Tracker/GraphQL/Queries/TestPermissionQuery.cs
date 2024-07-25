using GraphQL;
using GraphQL.Types;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Queries
{
    public class TestPermissionQuery: ObjectGraphType
    {
        public TestPermissionQuery(IPermissionsService permissionsService)
        {
            Field<StringGraphType>("test").Resolve(context =>
            {
                int userId = 2;

                string result = "";
                if(permissionsService.HasRequiredPermission(userId, Permissions.READ_TEST_QUERY))
                {
                    result += " Have READ_TEST_QUERY";
                }
                if (permissionsService.HasRequiredPermission(userId, Permissions.MANAGE_USERS))
                {
                    result += " Have MANAGE_USERS";
                }

                return "Permissions: " + result;
            });
        }
    }
}
