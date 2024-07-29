using GraphQL.Types;
using Microsoft.AspNetCore.Identity.Data;
using Time_Tracker.Dtos;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class LoginResponseGraphType : ObjectGraphType<LoginResponseDto>
{
    public LoginResponseGraphType()
    {
        Field(l => l.UserId, nullable: false);
        Field(l => l.AccessToken, nullable: true, type: typeof(TokenGraphType));
    }
}