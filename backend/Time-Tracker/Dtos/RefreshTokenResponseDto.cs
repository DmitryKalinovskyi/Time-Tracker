namespace Time_Tracker.Dtos
{
    public record class RefreshTokenResponseDto(int? UserId, TokenDto? AccessToken, TokenDto? RefreshToken);
}
