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
                SQLOperators.Contains => $"CONTAINS({fieldName}, {parameterName})",
                SQLOperators.GreaterThan => $"{fieldName} > {parameterName}",
                SQLOperators.LessThen => $"{fieldName} < {parameterName}",
                _ => throw new NotSupportedException($"The operator {operatorType} is not supported."),
            };
        }
    }
}
