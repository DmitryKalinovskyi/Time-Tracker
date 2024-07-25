using GraphQL.Types;
using Time_Tracker.Dtos;

namespace Time_Tracker.GraphQL.Types;

public class LoginInputGraphType : InputObjectGraphType<LoginRequestDto>
{
    public LoginInputGraphType()
    {
        Field(l => l.Email, nullable: false);
        Field(l => l.Password, nullable: false);
    }
}