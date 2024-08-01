using GraphQL.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class UserGraphType : ObjectGraphType<User>
{
    public UserGraphType(IRolesRepository rolesRepository)
    {
        Field(t => t.Id);
        Field(t => t.FullName);
        Field(t => t.Email);
        Field(t => t.RoleId, nullable: true);
        Field<RoleType>("role").Resolve(context =>
        {
            var roleId = context.Source.RoleId;

            if (roleId == null) return null;
            return rolesRepository.Find((int)roleId);
        });
    }
}
