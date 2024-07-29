using GraphQL;
using GraphQL.Types;
using System.Diagnostics.CodeAnalysis;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Authorization.Mutations
{
    public class RolesMutation: ObjectGraphType
    {
        public RolesMutation(IRolesRepository rolesRepository)
        {
            Field<RoleType>("createRole")
                .RequirePermission(Permissions.ManageRoles)
                .Arguments(new QueryArgument<NonNullGraphType<RoleInputType>>() { Name = "role" })
                .Resolve(context =>
                {
                    var roleId = rolesRepository.Insert(context.GetArgument<Role>("role"));

                    return rolesRepository.Find(roleId);
                });

            Field<RoleType>("updateRole")
                .RequirePermission(Permissions.ManageRoles)
                .Arguments(new QueryArgument<NonNullGraphType<RoleInputType>>() { Name = "role" },
                    new QueryArgument<NonNullGraphType<IntGraphType>>() { Name = "id" })
                .Resolve(context =>
                {
                    var role = context.GetArgument<Role>("role");
                    var roleId = context.GetArgument<int>("id");

                    rolesRepository.Update(roleId, role);

                    return rolesRepository.Find(roleId);    
                });

            Field<StringGraphType>("deleteRole")
                .RequirePermission(Permissions.ManageRoles)
                .Arguments(new QueryArgument<NonNullGraphType<IntGraphType>>() { Name = "id" })
                .Resolve(context =>
                {
                    var id = context.GetArgument<int>("id");
                    rolesRepository.Delete(id);

                    return "Ok";
                });
        }
    }
}
