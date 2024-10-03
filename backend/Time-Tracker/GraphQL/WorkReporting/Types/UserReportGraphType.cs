using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Services.WorkReport;

namespace Time_Tracker.GraphQL.WorkReporting.Types
{
    public class UserReportGraphType: ObjectGraphType<UserReport>
    {
        public UserReportGraphType()
        {
            Field(x => x.User, type: typeof(NonNullGraphType<UserGraphType>));
            Field(x => x.TrackedHours);
        }
    }
}
