using GraphQL.Types;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class CreateRoleInputType: InputObjectGraphType
    {
        public CreateRoleInputType()
        {
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<ListGraphType<StringGraphType>>>("permissions");
        }
    }
}
