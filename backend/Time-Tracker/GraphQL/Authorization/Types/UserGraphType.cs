using GraphQL.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class UserGraphType : ObjectGraphType<User>
{
    public UserGraphType()
    {
        Field(t => t.Id);
        Field(t => t.FullName);
        Field(t => t.Email);
        Field(t => t.Permissions, nullable: true);
        Field(t => t.IsActive);
    }
}
