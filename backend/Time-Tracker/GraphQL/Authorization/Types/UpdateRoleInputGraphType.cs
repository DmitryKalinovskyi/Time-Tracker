using GraphQL.Types;
using Time_Tracker.Models;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class UpdateRoleInputGraphType: InputObjectGraphType
    {
        public UpdateRoleInputGraphType()
        {
            Field<NonNullGraphType<IntGraphType>>("id");
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<ListGraphType<StringGraphType>>>("permissions");
        }
    }
}
