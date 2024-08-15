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

                    if(paginationArgs.First is not null && paginationArgs.Last is not null)
                    {
                        context.Errors.Add(new ExecutionError("Last and First could not be specified together."));
                        return null;
                    }

                    if (paginationArgs.Before is not null && paginationArgs.After is not null)
                    {
                        context.Errors.Add(new ExecutionError("Before and After could not be specified together."));
                        return null;
                    }

                    if (paginationArgs.Before is null && paginationArgs.After is null 
                          && paginationArgs.First is null && paginationArgs.Last is null)
                    {
                        context.Errors.Add(new ExecutionError("You need to specify at least one argument."));
                        return null;
                    }

                    if (paginationArgs.Year is not null && paginationArgs.Day is not null && paginationArgs.Month is null)
                    {
                        context.Errors.Add(new ExecutionError("You need to specify month to paginate using days."));
                        return null;
                    }

                    if (paginationArgs.Year is null && paginationArgs.Day is not null && paginationArgs.Month is not null)
                    {
                        context.Errors.Add(new ExecutionError("You need to specify year to paginate using days."));
                        return null;
                    }

                    if (paginationArgs.Year is null && paginationArgs.Day is not null && paginationArgs.Month is null)
                    {
                        context.Errors.Add(new ExecutionError("You need to specify year and month to paginate using days."));
                        return null;
                    }

                    if (paginationArgs.Year is null && paginationArgs.Day is null && paginationArgs.Month is not null)
                    {
                        context.Errors.Add(new ExecutionError("You need to specify year to paginate using months."));
                        return null;
                    }

                    var (workSessions, hasNextPage, hasPrevPage) = await workSessionRepository.GetWorkSessionsWithPagination(paginationArgs.First, paginationArgs.Last, paginationArgs.Before, paginationArgs.After,
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
                        TotalCount = edges.Count,
                    };
                });

        }
    }
}
