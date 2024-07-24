using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Identity.Data;
using Time_Tracker.Dtos;
using Time_Tracker.GraphQL.Types;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Queries;

public class IdentityQuery : ObjectGraphType
{
    public IdentityQuery(TokenService tokenService)
    {
        Field<LoginResponseGraphType>("login")
            .Argument<NonNullGraphType<LoginInputGraphType>>("input")
        .ResolveAsync(async context =>
        {
            LoginRequest query = context.GetArgument<LoginRequest>("input");

            //  TODO: Implement password check
            
            //  var token = tokenService.GenerateToken(userId);
            //  return new LoginResponseDto(userId, token);

            throw new NotImplementedException();
        });
    }
}