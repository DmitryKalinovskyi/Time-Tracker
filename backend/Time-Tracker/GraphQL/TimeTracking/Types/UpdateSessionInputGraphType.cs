using GraphQL.Types;

namespace Time_Tracker.GraphQL.TimeTracking.Types
{
    public class UpdateSessionInputGraphType: InputObjectGraphType
    {
        public UpdateSessionInputGraphType() 
        {
            Field<NonNullGraphType<IntGraphType>>("id");
            Field<NonNullGraphType<DateTimeGraphType>>("startTime");
            Field<NonNullGraphType<DateTimeGraphType>>("endTime");
        }
    }
}
