using GraphQL.Types;
using Time_Tracker.Models;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class RoleType: ObjectGraphType<Role>
    {
        public RoleType()
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.Permissions);
        }
    }
}
