﻿using Dapper;
using Time_Tracker.Enums;
using Time_Tracker.Extensions;
using Time_Tracker.Factories;

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
            if(filterCriterias is null || !filterCriterias.Any()) return (string.Empty, new DynamicParameters());

            var clauses = new List<string>();
            var parameters = new DynamicParameters();

            var filterableFieldMapper = FilterableFieldMapperFactory.GetMapper<TFilterFields>();

            int parameterIndex = 0;

            foreach(var filterCriteria in filterCriterias)
            {
                var fieldName = filterableFieldMapper.toSqlFieldName(filterCriteria.FilterBy);
                var parameterName = $"@{filterCriteria.FilterBy}_{parameterIndex++}";
                var clause = ((SQLOperators)(object)filterCriteria.Operator)
                    .ToSqlClause(fieldName, parameterName);
                clauses.Add(clause);

                var parameterValue = filterCriteria.Value;

                parameters.Add(parameterName, parameterValue);
            }


            var whereClause =  " WHERE DURATION is not NULL AND " + string.Join(" AND ", clauses);
            return (whereClause, parameters);
        }
    }
}
