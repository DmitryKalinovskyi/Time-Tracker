using GraphQL;
using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Authorization.Queries
{
    public class RolesQuery: ObjectGraphType
    {
        public RolesQuery(IRolesRepository rolesRepository)
        {
            Field<ListGraphType<RoleType>>("roles").Resolve(context => rolesRepository.GetRoles());

            Field<RoleType>("role")
                .Arguments(new QueryArgument<IntGraphType> { Name = "roleId" })
                .Resolve(context => rolesRepository.Find(context.GetArgument<int>("roleId")));
        }
    }
}
