using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Identity.Data;
using Time_Tracker.Dtos;
using Time_Tracker.GraphQL.Types;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Queries;

public class IdentityQuery : ObjectGraphType
{
    public IdentityQuery(TokenService tokenService, IUsersRepository usersRepository, HashingService hashingService)
    {
        Field<LoginResponseGraphType>("login")
            .Argument<NonNullGraphType<LoginInputGraphType>>("input")
        .ResolveAsync(async context =>
        {
            LoginRequestDto query = context.GetArgument<LoginRequestDto>("input");

            var user = usersRepository.FindByEmail(query.Email);

            if (user == null) throw new ExecutionError("Wrong email or password.");

            if (hashingService.ComputeHash(query.Password, user.Salt) != user.HashedPassword)
                throw new ExecutionError("Wrong email or password.");

            var token = tokenService.GenerateToken(user.Id);

            return new LoginResponseDto(user.Id, token);
        });
    }
}