using GraphQL.Types;

namespace Time_Tracker.GraphQL.TimeTracking.Types
{
    public class AddSessionInputGraphType: InputObjectGraphType
    {
        public AddSessionInputGraphType() 
        {
            Field<NonNullGraphType<IntGraphType>>("userId");
            Field<NonNullGraphType<DateTimeOffsetGraphType>>("startTime");
            Field<NonNullGraphType<DateTimeOffsetGraphType>>("endTime");
        }
    }
}
