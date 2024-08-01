using GraphQL;
using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Authorization.Queries
{
    public class UsersQuery: ObjectGraphType
    {
        public UsersQuery(IUsersRepository usersRepository)
        {
            Field<UserGraphType>("user")
                .Argument<NonNullGraphType<IntGraphType>>("userId")
                .Resolve(context => usersRepository.Find(context.GetArgument<int>("userId")));
        }
    }
}
