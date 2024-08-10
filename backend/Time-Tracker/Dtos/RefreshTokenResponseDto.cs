namespace Time_Tracker.Dtos
{
    public record class RefreshTokenResponseDto(TokenDto? AccessToken, TokenDto? RefreshToken);
}
