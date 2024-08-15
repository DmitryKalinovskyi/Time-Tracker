using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization.Mutations;
using Time_Tracker.GraphQL.TimeTracking.Mutations;

namespace Time_Tracker.GraphQL
{
    public class RootMutation: ObjectGraphType
    {
        public RootMutation()
        {
            Field<UserMutation>("userMutation").Resolve(context => new { });
            Field<IdentityMutation>("identityMutation").Resolve(context => new { });
            Field<TimeTrackerMutation>("timeTrackerMutation").Resolve(context => new { });
        }
    }
}
