namespace Time_Tracker.Helpers
{
    public class SortCriteria<TSortFields> where TSortFields : Enum
    {
        public required TSortFields SortBy { get; set; }
        public required bool isAscending { get; set; }
    }

    public class SortHelper
    {
        public static string BuildOrderByClause<TSortFields>(List<SortCriteria<TSortFields>> sortCriterias)
            where TSortFields : Enum
        {
            if(sortCriterias is null || !sortCriterias.Any()) return $" ORDER BY Id DESC";

            var orderByParts = sortCriterias.Select(criteria =>
            {
                string columnName = criteria.SortBy.ToString();
                string direction = criteria.isAscending ? "ASC" : "DESC";

                return $"{columnName} {direction}";
            });

            return " ORDER BY " + string.Join(", ", orderByParts);
        }
    }
}
