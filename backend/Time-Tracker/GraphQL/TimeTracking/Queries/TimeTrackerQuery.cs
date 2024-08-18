using GraphQL;
using GraphQL.Types;
using GraphQL.Types.Relay.DataObjects;
using System.Collections.Generic;
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

            Connection<WorkSessionGraphType>("workSessions")
                .Bidirectional()
                .Argument<IntGraphType>("userId")
                .Argument<IntGraphType>("year")
                .Argument<IntGraphType>("month")
                .Argument<IntGraphType>("day")
                .ResolveAsync(async context =>
                {
                    var paginationArgs = ExtendedPaginationHelper.GetExtendedPaginationArgs(context);

                    if(!(paginationArgs.First is not null && paginationArgs.After is not null 
                        && paginationArgs.Last is null && paginationArgs.Before is null) &&

                       !(paginationArgs.First is not null && paginationArgs.After is null
                        && paginationArgs.Last is null && paginationArgs.Before is null) &&

                       !(paginationArgs.First is  null && paginationArgs.After is null
                        && paginationArgs.Last is not null && paginationArgs.Before is not null) &&

                       !(paginationArgs.First is null && paginationArgs.After is null
                        && paginationArgs.Last is not null && paginationArgs.Before is null))

                    {
                        context.Errors.Add(new ExecutionError("You can only specify < First and After(optional) > or < Last and Before(optional) >."));
                        return null;
                    }

                    if(paginationArgs.First > 20 || paginationArgs.Last > 20)
                    {
                        context.Errors.Add(new ExecutionError("You can get at most 20 records in one request."));
                        return null;
                    }

                    if (!(paginationArgs.Year is not null && paginationArgs.Month is null
                        && paginationArgs.Day is null) &&

                       !(paginationArgs.Year is not null && paginationArgs.Month is  not null
                        && paginationArgs.Day is null) &&

                       !(paginationArgs.Year is not null && paginationArgs.Month is not null
                        && paginationArgs.Day is not null) &&

                        !(paginationArgs.Year is  null && paginationArgs.Month is  null
                        && paginationArgs.Day is  null))

                    {
                        context.Errors.Add(new ExecutionError("Inappropriate settings for year/month/day filtering."));
                        return null;
                    }



                    var (workSessions, hasNextPage, hasPrevPage, totalNumber) = await workSessionRepository.GetWorkSessionsWithPagination(paginationArgs.First, paginationArgs.Last, paginationArgs.Before, paginationArgs.After,
                                                                                                                             paginationArgs.UserId, paginationArgs.Year, paginationArgs.Month, paginationArgs.Day);

                    var edges = workSessions.Select(w => new Edge<WorkSession>
                    {
                        Node = w,
                        Cursor = w.Id.ToCursor(),
                    }).ToList();

                    var pageInfo = new PageInfo
                    {
                        HasNextPage = hasNextPage,
                        StartCursor = edges.FirstOrDefault()?.Cursor,
                        EndCursor = edges.LastOrDefault()?.Cursor,
                        HasPreviousPage = hasPrevPage,
                    };

                    return new Connection<WorkSession>
                    {
                        Edges = edges,
                        PageInfo = pageInfo,
                        TotalCount = totalNumber,
                    };
                });

        }
    }
}
