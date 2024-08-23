using GraphQL.Types;
using Microsoft.IdentityModel.Protocols;
using Time_Tracker.Helpers;

namespace Time_Tracker.GraphQL.Pagination
{
    public class PaginationRequestInputGraphType : InputObjectGraphType<PaginationRequest>
    {
        public PaginationRequestInputGraphType()
        {
            Field<NonNullGraphType<IntGraphType>>("pageNumber");
            Field<IntGraphType>("pageSize");
            Field<NonNullGraphType<StringGraphType>>("SortBy");
            Field<NonNullGraphType<BooleanGraphType>>("sortDescending");
            Field<ListGraphType<FilterInputGraphType>>("filters");
        }
    }
}
