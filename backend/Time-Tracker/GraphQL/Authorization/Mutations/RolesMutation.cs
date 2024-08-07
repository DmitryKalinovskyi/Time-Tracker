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
                .Argument<NonNullGraphType<CreateRoleInputType>>("role")
                .Resolve(context =>
                {
                    var roleId = rolesRepository.Insert(context.GetArgument<Role>("role"));

                    return rolesRepository.Find(roleId);
                });

            Field<RoleType>("updateRole")
                .RequirePermission(Permissions.ManageRoles)
                .Argument<NonNullGraphType<UpdateRoleInputGraphType>>("role")
                .Resolve(context =>
                {
                    var role = context.GetArgument<Role>("role");

                    rolesRepository.Update(role);

                    return rolesRepository.Find(role.Id);    
                });

            Field<StringGraphType>("deleteRole")
                .RequirePermission(Permissions.ManageRoles)
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .Resolve(context =>
                {
                    var id = context.GetArgument<int>("id");
                    rolesRepository.Delete(id);

                    return "Ok";
                });
        }
    }
}
