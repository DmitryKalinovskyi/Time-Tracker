using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Identity.Data;
using Time_Tracker.Dtos;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Helpers;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Authorization.Mutations;

public class IdentityMutation : ObjectGraphType
{
    public IdentityMutation(TokenService tokenService, IUsersRepository usersRepository, HashingService hashingService)
    {
        Field<LoginResponseGraphType>("login")
            .Argument<NonNullGraphType<LoginInputGraphType>>("input")
        .ResolveAsync(async context =>
        {
            LoginRequestDto query = context.GetArgument<LoginRequestDto>("input");

            var user = await usersRepository.FindByEmailAsync(query.Email);

            if (user is null || !user.IsActive) throw new ExecutionError("Wrong email or password.");

            if (hashingService.ComputeHash(query.Password, user.Salt) != user.HashedPassword)
                throw new ExecutionError("Wrong email or password.");

            var accessToken = tokenService.GenerateAccessToken(user.Id);
            var refreshToken = tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken.Value;
            user.RefreshTokenDateExpires = refreshToken.DateExpires;

            await usersRepository.UpdateAsync(user);

            return new LoginResponseDto(user.Id, accessToken, refreshToken);
        });

        Field<NonNullGraphType<RefreshTokenResponseGraphType>>("refreshToken")
            .Argument<NonNullGraphType<RefreshTokenRequestGraphType>>("input")
            .ResolveAsync(async context =>
            {
                var input = context.GetArgument<RefreshTokenRequestDto>("input");

                // Get payload from accessToken get user id and validate refresh token.
                // If they match and refresh token is not expired, create new acccess and refresh tokens.
                var userId = tokenService.GetAccessTokenClaimsPrincipal(input.AccessToken).GetUserId();

                if(userId == null)
                {
                    return new RefreshTokenResponseDto(null, null);
                }

                var user = await usersRepository.FindAsync((int)userId);
                if(user == null 
                || user.RefreshToken == null
                || user.RefreshTokenDateExpires == null
                || user.RefreshToken != input.RefreshToken
                || user.RefreshTokenDateExpires < DateTime.UtcNow)
                {
                    return new RefreshTokenResponseDto(null, null);
                }

                var accessToken = tokenService.GenerateAccessToken((int)userId);
                var refreshToken = tokenService.GenerateRefreshToken();

                user.RefreshToken = refreshToken.Value;

                await usersRepository.UpdateAsync(user);

                return new RefreshTokenResponseDto(accessToken, refreshToken);
            });
    }
}