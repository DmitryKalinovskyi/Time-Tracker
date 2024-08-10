using GraphQL;
using GraphQL.Types;
using Time_Tracker.Authorization;
using Time_Tracker.GraphQL.Authorization;

namespace Time_Tracker.GraphQL.Testing
{
    public class TestPermissionsQuery : ObjectGraphType
    {
        public TestPermissionsQuery()
        {
            Field<StringGraphType>("test")
                .RequirePermission(Permissions.ManageUsers)
                .Resolve((context) =>
                {
                    return "ok";
                });
        }
    }
}
