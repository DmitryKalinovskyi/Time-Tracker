using GraphQL.Types;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class RoleInputType: InputObjectGraphType
    {
        public RoleInputType()
        {
            Field<StringGraphType>("name");
            Field<ListGraphType<StringGraphType>>("permissions");
        }
    }
}
