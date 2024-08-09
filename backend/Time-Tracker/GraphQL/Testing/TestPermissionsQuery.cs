using GraphQL;
using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Testing
{
    public class TestPermissionsQuery : ObjectGraphType
    {
        public TestPermissionsQuery()
        {
            Field<StringGraphType>("test")
                .Authorize()
                .RequirePermission(Permissions.ManageUsers)
                .Resolve((context) => "ok");
        }
    }
}
