using GraphQL.Types;
using Microsoft.AspNetCore.Identity.Data;
using Time_Tracker.Dtos;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class LoginResponseGraphType : ObjectGraphType<LoginResponseDto>
{
    public LoginResponseGraphType(IUsersRepository usersRepository)
    {
        Field(l => l.UserId);
        Field(l => l.AccessToken, nullable: true, type: typeof(TokenGraphType));
        Field(l => l.RefreshToken, nullable: true, type: typeof(TokenGraphType));
        Field<NonNullGraphType<UserGraphType>>("user")
            .Resolve(context => usersRepository.FindAsync(context.Source.UserId));
    }
}