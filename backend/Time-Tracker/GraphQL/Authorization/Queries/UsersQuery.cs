using GraphQL;
using GraphQL.Types;
using Time_Tracker.Enums;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.GraphQL.Pagination;
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

            Field<PaginatedResultResponseGraphType<User, UserGraphType>>
                ("users")
                .Argument<NonNullGraphType<PaginationRequestInputGraphType<UserSortableFields, UserFilterableFields, SQLOperators>>>("input")
                .ResolveAsync(async context =>
                {
                    var paginationRequest = context.GetArgument<PaginationRequest<UserSortableFields, UserFilterableFields, SQLOperators>>("input");

                    return await usersRepository.GetUsersWithPaginationAsync(paginationRequest);
                });
        }
    }

   
}
