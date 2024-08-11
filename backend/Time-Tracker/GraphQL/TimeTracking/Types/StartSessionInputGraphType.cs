using GraphQL.Types;

namespace Time_Tracker.GraphQL.TimeTracking.Types
{
    public class StartSessionInputGraphType: InputObjectGraphType
    {
        public StartSessionInputGraphType() 
        {
            Field<NonNullGraphType<IntGraphType>>("userId");
            Field<DateTimeGraphType>("startTime");
            Field<DateTimeGraphType>("endTime");
            Field<NonNullGraphType<IntGraphType>>("sessionOriginId");
            Field<IntGraphType>("editedBy");
        }

    }
}
