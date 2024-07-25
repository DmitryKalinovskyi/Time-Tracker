using GraphQL.Types;

namespace Time_Tracker.GraphQL.Queries
{
    public class RootQuery: ObjectGraphType
    {
        public RootQuery()
        {

            Field<IdentityQuery>("identityQuery").Resolve(context => new { });
            Field<TestQuery>("testQuery").Resolve(context => new { });
            Field<TestPermissionQuery>("testPermissionsQuery").Resolve(context => new { });
            Field<PermissionsQuery>("permissionsQuery").Resolve(context => new { });

        }
    }
}
