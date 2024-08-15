using GraphQL.Types;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class ResetPasswordInputGraphType : InputObjectGraphType
{
    public ResetPasswordInputGraphType()
    {
        Field<NonNullGraphType<StringGraphType>>("email");
    }
}
