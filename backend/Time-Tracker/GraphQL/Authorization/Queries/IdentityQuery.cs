using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Identity.Data;
using Time_Tracker.Dtos;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Authorization.Queries;

public class IdentityQuery : ObjectGraphType
{
    public IdentityQuery(TokenService tokenService, IUsersRepository usersRepository, IPasswordService passwordService)
    {
        Field<LoginResponseGraphType>("login")
            .Argument<NonNullGraphType<LoginInputGraphType>>("input")
        .ResolveAsync(async context =>
        {
            LoginRequestDto query = context.GetArgument<LoginRequestDto>("input");

            var user = usersRepository.FindByEmail(query.Email);

            if (user == null) throw new ExecutionError("User with that email not founded.");

            if (!passwordService.IsMatch(query.Password, user.HashedPassword))
                throw new ExecutionError("Invalid credentials.");

            var token = tokenService.GenerateToken(user.Id);

            return new LoginResponseDto(user.Id, token);
        });
    }
}