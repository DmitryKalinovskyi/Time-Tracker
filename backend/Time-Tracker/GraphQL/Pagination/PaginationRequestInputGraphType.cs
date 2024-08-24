using GraphQL.Types;
using Microsoft.IdentityModel.Protocols;
using Time_Tracker.Helpers;

namespace Time_Tracker.GraphQL.Pagination
{
    public class PaginationRequestInputGraphType<TSortFields, TFilterFields, TOperators> : InputObjectGraphType<PaginationRequest<TSortFields, TFilterFields, TOperators>>
        where TSortFields : Enum
        where TFilterFields : Enum
        where TOperators : Enum
    {
        public PaginationRequestInputGraphType()
        {
            Name = $"PaginationRequestInputGraphType_{typeof(TSortFields).Name}";
            Field<NonNullGraphType<IntGraphType>>("pageNumber");
            Field<IntGraphType>("pageSize");
            Field<NonNullGraphType<ListGraphType<SortCriteriaInputGraphType<TSortFields>>>>("sortCriterias");
            Field<ListGraphType<FilterCriteriaInputGraphType<TFilterFields, TOperators>>>("filterCriterias");
        }
    }
}
