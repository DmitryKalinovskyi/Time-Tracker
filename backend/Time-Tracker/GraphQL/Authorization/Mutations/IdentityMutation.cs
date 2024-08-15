using GraphQL;
using GraphQL.Types;
using Time_Tracker.Dtos;
using Time_Tracker.GraphQL.Authorization.Exceptions;
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

            if (user is null || !user.IsActive) throw new InvalidCredentialsExecutionError("Wrong email or password.");

            if (hashingService.ComputeHash(query.Password, user.Salt) != user.HashedPassword)
                throw new InvalidCredentialsExecutionError("Wrong email or password.");

            var accessToken = tokenService.GenerateAccessToken(user.Id);
            var refreshToken = tokenService.GenerateRefreshToken(user.Id);

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
                var userId = tokenService.GetRefreshTokenClaimsPrincipal(input.RefreshToken).GetUserId();

                var user = await usersRepository.FindAsync(userId) ??
                    throw new UserNotFoundedExecutionError("User not founded.");

                if (user.RefreshToken == null
                || user.RefreshTokenDateExpires == null
                || user.RefreshToken != input.RefreshToken
                || user.RefreshTokenDateExpires < DateTime.UtcNow)
                {
                    
                    throw new InvalidRefreshTokenExecutionError("Refresh token is invalid or expired.");
                }

                var accessToken = tokenService.GenerateAccessToken(userId);
                var refreshToken = tokenService.GenerateRefreshToken(userId);

                user.RefreshToken = refreshToken.Value;

                await usersRepository.UpdateAsync(user);

                return new RefreshTokenResponseDto(user.Id, accessToken, refreshToken);
            });

        Field<NonNullGraphType<StringGraphType>>("logout")
            .Authorize()
            .ResolveAsync(async context =>
            {
                var userId = context.User.GetUserId();

                var user = await usersRepository.FindAsync(userId) ?? 
                    throw new UserNotFoundedExecutionError("User not founded.");

                user.RefreshToken = null;
                user.RefreshTokenDateExpires = null;

                await usersRepository.UpdateAsync(user);

                return "ok";
            });
    }
}