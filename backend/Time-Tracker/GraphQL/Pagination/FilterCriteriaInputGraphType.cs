using GraphQL.Types;
using Time_Tracker.Helpers;

namespace Time_Tracker.GraphQL.Pagination
{
    public class FilterCriteriaInputGraphType<TFilterFields, TOperators>: InputObjectGraphType<FilterCriteria<TFilterFields, TOperators>>
        where TFilterFields : Enum
        where TOperators : Enum
    {
        public FilterCriteriaInputGraphType()
        {
            Name = $"SortCriteriaInputGraphType_{typeof(TFilterFields).Name}_{typeof(TOperators).Name}";
            Field<NonNullGraphType<EnumerationGraphType<TFilterFields>>>("filterBy");
            Field<NonNullGraphType<EnumerationGraphType<TOperators>>>("operator");
            Field<NonNullGraphType<StringGraphType>>("value");
            
        }
    }
}
