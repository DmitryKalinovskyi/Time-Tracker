using GraphQL.Types;
using Time_Tracker.Dtos;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class RefreshTokenRequestGraphType: InputObjectGraphType<RefreshTokenRequestDto>
    {
        public RefreshTokenRequestGraphType()
        {
            Field(x => x.RefreshToken);
        }
    }
}
