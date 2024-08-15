using GraphQL;
using GraphQL.Types;
using GraphQL.Types.Relay.DataObjects;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Helpers;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Authorization.Queries
{
    public class UsersQuery: ObjectGraphType
    {
        public UsersQuery(IUsersRepository usersRepository)
        {
            Field<UserGraphType>("user")
                .Argument<NonNullGraphType<IntGraphType>>("userId")
                .ResolveAsync(async context => await usersRepository.FindAsync(context.GetArgument<int>("userId")));

            Connection<UserGraphType>("users")
            .Bidirectional()
            .ResolveAsync(async context =>
            {
                var paginationArgs = BasePaginationHelper.GetBasePaginationArgs(context);

                if (paginationArgs.First is not null && paginationArgs.Last is not null)
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

                var (users, hasNextPage, hasPrevPage) = await usersRepository.GetUsersAsync(paginationArgs.First, paginationArgs.After,
                                                                paginationArgs.Last, paginationArgs.Before);


                var edges = users.Select(u => new Edge<User>
                {
                    Node = u,
                    Cursor = u.Id.ToCursor()
                }).ToList();

                var pageInfo = new PageInfo
                {
                    HasNextPage = hasNextPage,
                    StartCursor = edges.FirstOrDefault()?.Cursor,
                    EndCursor = edges.LastOrDefault()?.Cursor,
                    HasPreviousPage = hasPrevPage
                };

                return new Connection<User>
                {
                    Edges = edges,
                    PageInfo = pageInfo,
                    TotalCount = edges.Count,
                };
            });
        }
    }

   
}
