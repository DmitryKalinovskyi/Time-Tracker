using Dapper;
using System.Text;

namespace Time_Tracker.Helpers
{
    public class PaginationRequest
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 5;

        public string SortBy { get; set; } = "Id";
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

        public static (string Query, DynamicParameters Parameters) BuildPaginatedQuery(
            string tableName,
            PaginationRequest request)
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
            queryBuilder.Append($" ORDER BY {request.SortBy} {(request.SortDescending ? "DESC" : "ASC")}");


            //Apply pagination
            var offset = (request.PageNumber - 1) * request.PageSize;
            queryBuilder.Append($" OFFSET {offset} ROWS FETCH NEXT {request.PageSize} ROWS ONLY");

            return (queryBuilder.ToString(), parameters);
        }

        public static string BuildCountQuery(string tableName, PaginationRequest request)
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
