using GraphQL.Types;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class CreateUserInputGraphType : InputObjectGraphType
{
    public CreateUserInputGraphType()
    {
        Field<NonNullGraphType<StringGraphType>>("fullName");
        Field<NonNullGraphType<StringGraphType>>("email");
    }
}