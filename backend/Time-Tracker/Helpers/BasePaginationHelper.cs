﻿using GraphQL;

namespace Time_Tracker.Helpers
{
    public class BasePaginationArgs
    {
        public int? First { get; set; }
        public int? Last { get; set; }
        public int? After { get; set; }
        public int? Before { get; set; }
    }

    public class BasePaginationHelper
    {
            public static BasePaginationArgs GetBasePaginationArgs<TSource>(IResolveFieldContext<TSource> context)
            {
                var first = context.GetArgument<int?>("first");
                var afterCursor = context.GetArgument<string>("after");
                var after = !string.IsNullOrEmpty(afterCursor) ? CursorHelper.FromCursor(afterCursor) : null;

                var last = context.GetArgument<int?>("last");
                var beforeCursor = context.GetArgument<string>("before");
                var before = !string.IsNullOrEmpty(beforeCursor) ? CursorHelper.FromCursor(beforeCursor) : null;

                return new BasePaginationArgs
                {
                    First = first,
                    Last = last,
                    After = after,
                    Before = before
                };

            }
        }
}
