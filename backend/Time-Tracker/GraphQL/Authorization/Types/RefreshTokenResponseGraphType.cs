using GraphQL.Types;
using Time_Tracker.Dtos;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class RefreshTokenResponseGraphType: ObjectGraphType<RefreshTokenResponseDto>
    {
        public RefreshTokenResponseGraphType()
        {
            Field(x => x.AccessToken, nullable: true, type: typeof(TokenGraphType)); 
            Field(x => x.RefreshToken, nullable: true, type: typeof(TokenGraphType)); 
        }
    }
}
