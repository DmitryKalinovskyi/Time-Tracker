using GraphQL;
using GraphQL.Types;
using System.Security.Claims;
using Time_Tracker.Services;
using Time_Tracker.GraphQL.Extensions;


namespace Time_Tracker.GraphQL.Queries
{
    public class TestPermissionQuery: ObjectGraphType
    {
        public TestPermissionQuery()
        {
            Field<StringGraphType>("test")
                .RequirePermission(Permissions.ReadTestQuery)
                .Resolve(context => 
            {
                return "Hello from test permission query!";
            });
        }
    }
}
