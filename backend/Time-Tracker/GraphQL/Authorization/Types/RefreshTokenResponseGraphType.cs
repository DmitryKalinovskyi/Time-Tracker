using GraphQL.Types;
using Time_Tracker.Dtos;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class RefreshTokenResponseGraphType: ObjectGraphType<RefreshTokenResponseDto>
    {
        public RefreshTokenResponseGraphType(IUsersRepository usersRepository)
        {
            Field(l => l.UserId);
            Field(x => x.AccessToken, type: typeof(TokenGraphType)); 
            Field(l => l.RefreshToken, type: typeof(TokenGraphType));
            Field<UserGraphType>("user")
                .ResolveAsync(async context => await usersRepository.FindAsync(context.Source.UserId));
        }
    }
}
