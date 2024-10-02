using GraphQL.Types;
using Time_Tracker.Services.WorkReport;

namespace Time_Tracker.GraphQL.WorkReporting.Types
{
    public class WorkReportGraphType: ObjectGraphType<WorkReport>
    {
        public WorkReportGraphType()
        {
            Field(x => x.Users, type: typeof(NonNullGraphType<ListGraphType<NonNullGraphType<UserReportGraphType>>>));
        }
    }
}
