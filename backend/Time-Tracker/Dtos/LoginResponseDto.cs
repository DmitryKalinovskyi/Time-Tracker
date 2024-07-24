using GraphQLParser;

namespace Time_Tracker.Dtos;

public record LoginResponseDto(int UserId, TokenDto AccessToken);