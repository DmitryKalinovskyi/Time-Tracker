using Dapper;
using Microsoft.AspNetCore.Http.Extensions;
using System.Text;

namespace Time_Tracker.Helpers
{
    public class PaginationRequest<TSortFields, TFilterFields, TOperators>
        where TSortFields : Enum
        where TFilterFields : Enum
        where TOperators : Enum
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public  required List<SortCriteria<TSortFields>> SortCriterias { get; set; }
        public required List<FilterCriteria<TFilterFields, TOperators>> FilterCriterias { get; set; }
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

        public static (string Query, DynamicParameters Parameters) BuildPaginatedQuery<TSortFields, TFilterFields, TOperators>(
            string tableName,
            PaginationRequest<TSortFields, TFilterFields, TOperators> request)
            where TSortFields : Enum
            where TFilterFields : Enum
            where TOperators : Enum
        {
            var queryBuilder = new StringBuilder($"SELECT * FROM {tableName}");
            var parameters = new DynamicParameters();

            //Apply filters
            var (whereClause, filterParameters) = FilterHelper.BuildWhereClause(request.FilterCriterias);
            
            queryBuilder.Append(whereClause);
            
            parameters.AddDynamicParams(filterParameters);

            //Apply sorting
            var orderByClause = SortHelper.BuildOrderByClause(request.SortCriterias);

            queryBuilder.Append(orderByClause);


            //Apply pagination
            var offset = (request.PageNumber - 1) * request.PageSize;
            queryBuilder.Append($" OFFSET {offset} ROWS FETCH NEXT {request.PageSize} ROWS ONLY");

            return (queryBuilder.ToString(), parameters);
        }

        public static string BuildCountQuery<TSortFields, TFilterFields, TOperators>(string tableName, PaginationRequest<TSortFields, TFilterFields, TOperators> request)
            where TSortFields : Enum
            where TFilterFields : Enum
            where TOperators : Enum
        {
            var countQueryBuilder = new StringBuilder($"SELECT COUNT(1) FROM {tableName}");

            //Apply filters
            var whereClauseWithParams = FilterHelper.BuildWhereClause(request.FilterCriterias);

            countQueryBuilder.Append(whereClauseWithParams.WhereClause);

            return countQueryBuilder.ToString();
        }
            
    }
}
