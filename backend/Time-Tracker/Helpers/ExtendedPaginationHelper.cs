using GraphQL;

namespace Time_Tracker.Helpers
{
    public class ExtendedPaginationArgs: BasePaginationArgs
    {
        public int? UserId { get; set; }
        public int? Year { get; set; }
        public int? Month { get; set; }
        public int? Day { get; set; }
    }

    public class ExtendedPaginationHelper: BasePaginationHelper
    {
        public static ExtendedPaginationArgs GetExtendedPaginationArgs<TSource>(IResolveFieldContext<TSource> context)
        {
            var baseArgs = GetBasePaginationArgs(context);

            var userId = context.GetArgument<int?>("userId");
            var year = context.GetArgument<int?>("year");
            var month = context.GetArgument<int?>("month");
            var day = context.GetArgument<int?>("day");

            return new ExtendedPaginationArgs
            {
                First = baseArgs.First,
                Last = baseArgs.Last,
                After = baseArgs.After,
                Before = baseArgs.Before,
                UserId = userId,
                Year = year,
                Month = month,
                Day = day
            };
        }
    }
}
