using Dapper;
using System.Text;

namespace Time_Tracker.Helpers
{
    public class PaginationRequest<TSortFields>
        where TSortFields : Enum
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public  required List<SortCriteria<TSortFields>> SortCriterias { get; set; }
        public bool SortDescending { get; set; } = false;
        public List<KeyValuePair<string, string>> Filters { get; set; } = new List<KeyValuePair<string, string>>();
    }

    public class PaginationResult<T>
    {
        public IEnumerable<T> Results { get; set; } = [ ];
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }


    public class PaginationHelper
    {

        public static (string Query, DynamicParameters Parameters) BuildPaginatedQuery<TSortFields>(
            string tableName,
            PaginationRequest<TSortFields> request)
            where TSortFields : Enum
        {
            var queryBuilder = new StringBuilder($"SELECT * FROM {tableName} WHERE 1 = 1");
            var parameters = new DynamicParameters();

            //Apply filters
            if(request.Filters.Any())
            {
                foreach( var filter in request.Filters)
                {
                    queryBuilder.Append($" AND {filter.Key} = @{filter.Key}");
                    parameters.Add($"@{filter.Key}", filter.Value);
                }
            }

            //Apply sorting
            var orderByClause = SortHelper.BuildOrderByClause(request.SortCriterias);

            queryBuilder.Append(orderByClause);


            //Apply pagination
            var offset = (request.PageNumber - 1) * request.PageSize;
            queryBuilder.Append($" OFFSET {offset} ROWS FETCH NEXT {request.PageSize} ROWS ONLY");

            return (queryBuilder.ToString(), parameters);
        }

        public static string BuildCountQuery<TSortFields>(string tableName, PaginationRequest<TSortFields> request)
            where TSortFields : Enum
        {
            var countQueryBuilder = new StringBuilder($"SELECT COUNT(1) FROM {tableName} WHERE 1=1");

            //Apply filters
            if(request.Filters.Any())
            {
                foreach(var filter in request.Filters)
                {
                    countQueryBuilder.Append($" AND {filter.Key} = @{filter.Key}");
                }
            }

            return countQueryBuilder.ToString();
        }
            
    }
}
