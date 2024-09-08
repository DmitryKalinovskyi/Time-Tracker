using GraphQL;
using GraphQL.Types;
using Time_Tracker.Enums;
using Time_Tracker.GraphQL.Pagination;
using Time_Tracker.GraphQL.TimeTracking.Types;
using Time_Tracker.Helpers;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.TimeTracking.Queries
{
    public class TimeTrackerQuery: ObjectGraphType
    {
        public TimeTrackerQuery(IWorkSessionRepository workSessionRepository) 
        {
            Field<WorkSessionGraphType>("workSession")
                .Argument<NonNullGraphType<IntGraphType>>("id")
                .ResolveAsync(async context =>
                {
                    var inputId = context.GetArgument<int>("id");

                    var workSession = await workSessionRepository.GetWorkSessionByIdAsync(inputId);

                    return workSession;
                });

            Field<PaginatedResultResponseGraphType<WorkSession, WorkSessionGraphType>>
                ("workSessions")
                .Argument<NonNullGraphType<PaginationRequestInputGraphType<WorkSessionSortableFields, WorkSessionFilterableFields, SQLOperators>>>("input")
                .ResolveAsync(async context =>
                {
                    var paginationRequest = context.GetArgument<PaginationRequest<WorkSessionSortableFields, WorkSessionFilterableFields, SQLOperators>>("input");

                    return await workSessionRepository.GetWorkSessionsWithPaginationAsync(paginationRequest);
                });

        }
    }
}
