using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization.Mutations;

namespace Time_Tracker.GraphQL
{
    public class RootMutation: ObjectGraphType
    {
        public RootMutation()
        {
            Field<RolesMutation>("rolesMutation").Resolve(context => new { });
            Field<UserMutation>("userMutation").Resolve(context => new { });
        }
    }
}
