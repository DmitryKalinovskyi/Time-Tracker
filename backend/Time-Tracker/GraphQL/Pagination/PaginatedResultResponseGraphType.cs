using GraphQL.Types;
using Time_Tracker.Helpers;

namespace Time_Tracker.GraphQL.Pagination
{
    public class PaginatedResultResponseGraphType<TEntity, TGraphType> : ObjectGraphType<PaginationResult<TEntity>>
         where TGraphType : IGraphType
    {
        public PaginatedResultResponseGraphType()
        {
            Name = $"PaginatedResultResponse_{typeof(TEntity).Name}_{typeof(TGraphType).Name}";
            Field(x => x.Results, type: typeof(ListGraphType<TGraphType>));
            Field(x => x.TotalRecords);
            Field(x => x.TotalPages);
            Field(x => x.CurrentPage);
            Field(x => x.PageSize);
        }
    }
}
