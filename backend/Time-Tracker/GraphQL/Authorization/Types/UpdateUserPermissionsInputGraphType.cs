using GraphQL.Types;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class UpdateUserPermissionsInputGraphType : InputObjectGraphType
{
    public UpdateUserPermissionsInputGraphType()
    {
        Field<NonNullGraphType<IntGraphType>>("id");
        Field<ListGraphType<StringGraphType>>("permissions");
    }
}