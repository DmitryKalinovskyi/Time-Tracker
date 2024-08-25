namespace Time_Tracker.Enums
{
    public enum FilterOperators
    {
        Equal,
        NotEqual,
        Like,
        Contains,
        GreaterThan,
        LessThen
    }

    public static class FilterOperatorsExtensions
    {
        public static string ToSqlClause(this FilterOperators operatorType, string fieldName, string parameterName)
        {
            return operatorType switch
            {
                FilterOperators.Equal => $"{fieldName} = {parameterName}",
                FilterOperators.NotEqual => $"{fieldName} != {parameterName}",
                FilterOperators.Like => $"{fieldName} LIKE {parameterName}",
                FilterOperators.Contains => $"CONTAINS({fieldName}, {parameterName})",
                FilterOperators.GreaterThan => $"{fieldName} > {parameterName}",
                FilterOperators.LessThen => $"{fieldName} < {parameterName}",
                _ => throw new NotSupportedException($"The operator {operatorType} is not supported."),
            };
        }
    }
}
