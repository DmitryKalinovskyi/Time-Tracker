using GraphQL.Types;
using Microsoft.IdentityModel.Protocols;
using Time_Tracker.GraphQL.Authorization.Queries;
using Time_Tracker.GraphQL.Queries;

namespace Time_Tracker.GraphQL
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<IdentityQuery>("identityQuery").Resolve(context => new { });
            Field<TestQuery>("testQuery").Resolve(context => new { });
            Field<PermissionsQuery>("permissionsQuery").Resolve(context => new { });
            Field<RolesQuery>("rolesQuery").Resolve(context => new { });
            Field<UsersQuery>("usersQuery").Resolve(context => new { });
        }
    }
}
