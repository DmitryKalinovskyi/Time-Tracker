using GraphQL.Types;
using Microsoft.IdentityModel.Protocols;
using Time_Tracker.Helpers;

namespace Time_Tracker.GraphQL.Pagination
{
    public class PaginationRequestInputGraphType<TSortFields> : InputObjectGraphType<PaginationRequest<TSortFields>>
        where TSortFields : Enum
    {
        public PaginationRequestInputGraphType()
        {
            Name = $"PaginationRequestInputGraphType_{typeof(TSortFields).Name}";
            Field<NonNullGraphType<IntGraphType>>("pageNumber");
            Field<IntGraphType>("pageSize");
            Field<NonNullGraphType<ListGraphType<SortCriteriaInputGraphType<TSortFields>>>>("sortCriterias");
            Field<ListGraphType<FilterInputGraphType>>("filters");
        }
    }
}
