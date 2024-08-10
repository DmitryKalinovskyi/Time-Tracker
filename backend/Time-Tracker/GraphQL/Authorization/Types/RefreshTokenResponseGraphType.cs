using GraphQL.Types;
using Time_Tracker.Dtos;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class RefreshTokenResponseGraphType: ObjectGraphType<RefreshTokenResponseDto>
    {
        public RefreshTokenResponseGraphType(IUsersRepository usersRepository)
        {
            Field(l => l.UserId, nullable: true);
            Field(x => x.AccessToken, nullable: true, type: typeof(TokenGraphType)); 
            Field(l => l.RefreshToken, nullable: true, type: typeof(TokenGraphType));
            Field<UserGraphType>("user")
                .ResolveAsync(async context => context.Source.UserId != null ? 
                    await usersRepository.FindAsync((int)context.Source.UserId) : null
                );
        }
    }
}
