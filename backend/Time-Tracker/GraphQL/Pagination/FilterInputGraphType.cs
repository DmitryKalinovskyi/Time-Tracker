using GraphQL.Types;
using Microsoft.IdentityModel.Protocols;

namespace Time_Tracker.GraphQL.Pagination
{
    public class FilterInputGraphType : InputObjectGraphType
    {
        public FilterInputGraphType()
        {
            Field<NonNullGraphType<StringGraphType>>("key");
            Field<NonNullGraphType<StringGraphType>>("value");
        }

    }
}
