using GraphQL.Types;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class UserInputGraphType : InputObjectGraphType
{
    public UserInputGraphType()
    {
        Field<NonNullGraphType<StringGraphType>>("fullName");
        Field<NonNullGraphType<StringGraphType>>("email");
    }
}