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
                int? first = context.GetArgument<int?>("first");
                string afterCursor = context.GetArgument<string>("after");
                int? after = !string.IsNullOrEmpty(afterCursor) ? CursorHelper.FromCursor(afterCursor) : (int?)null;

                int? last = context.GetArgument<int?>("last");
                string beforeCursor = context.GetArgument<string>("before");
                int? before = !string.IsNullOrEmpty(beforeCursor) ? CursorHelper.FromCursor(beforeCursor) : (int?)null;


                var users = await usersRepository.GetUsersAsync(first, after, last, before);
                var totalCount = await usersRepository.GetTotalUsersCount();

                var edges = users.Select(u => new Edge<User>
                {
                    Node = u,
                    Cursor = u.Id.ToCursor()
                }).ToList();

                var hasNextPage = edges.Count < totalCount;
                var hasPreviousPage = before.HasValue || (after.HasValue && edges.First().Node?.Id > 10); ;

                var pageInfo = new PageInfo
                {
                    HasNextPage = !last.HasValue ? hasNextPage : hasPreviousPage,
                    StartCursor = edges.First().Cursor,
                    EndCursor = edges.Last().Cursor,
                    HasPreviousPage = !last.HasValue ? hasPreviousPage : hasNextPage,
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
