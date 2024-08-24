using Dapper;
using Time_Tracker.Enums;

namespace Time_Tracker.Helpers
{
    public class FilterCriteria<TFilterFields, TOperators> 
        where TFilterFields: Enum
        where TOperators : Enum
    {
        public required TFilterFields FilterBy { get; set; }
        public required TOperators Operator { get; set; }
        public required string Value { get ; set; }
    }

    public class FilterHelper
    {
        public static (string WhereClause, DynamicParameters Parameters) BuildWhereClause<TFilterFields, TOperators>(List<FilterCriteria<TFilterFields, TOperators>> filterCriterias)
        where TFilterFields: Enum
        where TOperators : Enum
        {
            if(!filterCriterias.Any()) return (string.Empty, new DynamicParameters());

            var clauses = new List<string>();
            var parameters = new DynamicParameters();

            foreach(var filterCriteria in filterCriterias)
            {
                var parameterName = $"@{filterCriteria.FilterBy}";
                var clause = ((FilterOperators)(object)filterCriteria.Operator)
                    .ToSqlClause(filterCriteria.FilterBy.ToString(), parameterName);
                clauses.Add(clause);
                var parameterValue = (FilterOperators)(object)filterCriteria.Operator == FilterOperators.Contains ? $"\"{filterCriteria.Value}\"" : filterCriteria.Value;
                parameters.Add(parameterName, parameterValue);
            }


            var whereClause =  " WHERE " + string.Join(" AND ", clauses);
            return (whereClause, parameters);
        }
    }
}
