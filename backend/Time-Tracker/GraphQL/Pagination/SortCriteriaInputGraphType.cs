using GraphQL.Types;
using Microsoft.IdentityModel.Protocols;
using Time_Tracker.Helpers;

namespace Time_Tracker.GraphQL.Pagination
{
    public class SortCriteriaInputGraphType<TSortFields>: InputObjectGraphType<SortCriteria<TSortFields>>
        where TSortFields : Enum
    {
        public SortCriteriaInputGraphType() 
        {
            Name = $"SortCriteriaInputGraphType_{typeof(TSortFields).Name}";
            Field<NonNullGraphType<EnumerationGraphType<TSortFields>>>("sortBy");
            Field<NonNullGraphType<BooleanGraphType>>("isAscending");
        }
    }
}
