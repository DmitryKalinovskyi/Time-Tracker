using Time_Tracker.Enums;

namespace Time_Tracker.Extensions
{
    public static class SQLOperatorsExtensions
    {
        public static string ToSqlClause(this SQLOperators operatorType, string fieldName, string parameterName)
        {
            return operatorType switch
            {
                SQLOperators.Equal => $"{fieldName} = {parameterName}",
                SQLOperators.NotEqual => $"{fieldName} != {parameterName}",
                SQLOperators.Like => $"{fieldName} LIKE {parameterName}",
                SQLOperators.Contains => $"CONTAINS({fieldName}, CAST({parameterName} as nvarchar))",
                SQLOperators.GreaterThan => $"{fieldName} > {parameterName}",
                SQLOperators.LessThen => $"{fieldName} < {parameterName}",
                SQLOperators.GreaterThanOrEqual => $"{fieldName} >= {parameterName}",
                SQLOperators.LessThanOrEqual => $"{fieldName} <= {parameterName}",
                SQLOperators.In => $"{fieldName} IN (select value from string_split({parameterName},','))",
                SQLOperators.Between => $"" +
                $"{fieldName} BETWEEN " +
                $"(select value from string_split({parameterName},',', 1) WHERE ordinal = 1) AND " +
                $"(select value from string_split({parameterName},',', 1) WHERE ordinal = 2)",
                _ => throw new NotSupportedException($"The operator {operatorType} is not supported."),
            };
        }
    }
}
