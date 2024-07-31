using GraphQL.Types;
using Time_Tracker.Dtos;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class ActivateUserInputGraphType : InputObjectGraphType<ActivateUserDto>
{
    public ActivateUserInputGraphType()
    {
        Field(l => l.Code, nullable: false);
        Field(l => l.Password, nullable: false);
    }
}