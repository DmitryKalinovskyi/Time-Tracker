using GraphQL.Types;
using Microsoft.Identity.Client;
using Time_Tracker.GraphQL.WorkReporting.Dtos;

namespace Time_Tracker.GraphQL.WorkReporting.Types
{
    public class WorkReportInputGraphType: InputObjectGraphType<WorkReportRequest>
    {
        public WorkReportInputGraphType()
        {
            Field(x => x.From);
            Field(x => x.To);
            Field(x => x.Page);
            Field(x => x.PageSize);
        }
    }
}
