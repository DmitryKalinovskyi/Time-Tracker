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

                    return await workReportBuilder
                        .From(request.From)
                        .To(request.To)
                        .Paginate(request.Page, request.PageSize)
                        .BuildReport();
                });

            //// excel file format
            Field<StringGraphType>("excelWorkReport")
                .ResolveAsync(async context =>
                {
                    var workReportBuilder = new WorkReportBuilder(sqlConnectionFactory);

                    var reportFile = await workReportBuilder.From(DateTimeOffset.Parse("2024-09-11 11:08:53.6233333+00:00"))
                    .To(DateTimeOffset.Parse("2024-10-17 08:40:37.0466667 +00:00"))
                    .BuildExcelReportFile();

                    return reportFile;
                });
        }
    }
}
