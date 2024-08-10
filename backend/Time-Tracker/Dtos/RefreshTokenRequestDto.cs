using GraphQL.Types;

namespace Time_Tracker.Dtos
{
    public record class RefreshTokenRequestDto(string AccessToken, string RefreshToken);
}
