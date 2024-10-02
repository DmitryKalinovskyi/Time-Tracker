using GraphQL;
using GraphQL.Types;
using Time_Tracker.Factories;
using Time_Tracker.GraphQL.WorkReporting.Dtos;
using Time_Tracker.GraphQL.WorkReporting.Types;
using Time_Tracker.Services.WorkReport;

namespace Time_Tracker.GraphQL.WorkReporting
{
    public class WorkReportingQuery: ObjectGraphType
    {
        public WorkReportingQuery(ISQLConnectionFactory sqlConnectionFactory) 
        {
            Field<NonNullGraphType<WorkReportGraphType>>("workReport")
                .Argument<WorkReportInputGraphType>("input")
                .ResolveAsync(async context =>
                {
                    var request = context.GetArgument<WorkReportRequest>("input");

                    var workReportBuilder = new WorkReportBuilder(sqlConnectionFactory);

                    return workReportBuilder
                        .From(request.From)
                        .To(request.To)
                        .BuildReport();
                });

            //// excel file format
        }
    }
}
