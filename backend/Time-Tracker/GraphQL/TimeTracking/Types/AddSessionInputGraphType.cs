using GraphQL.Types;

namespace Time_Tracker.GraphQL.TimeTracking.Types
{
    public class AddSessionInputGraphType: InputObjectGraphType
    {
        public AddSessionInputGraphType() 
        {
            Field<NonNullGraphType<IntGraphType>>("userId");
            Field<NonNullGraphType<DateTimeGraphType>>("startTime");
            Field<NonNullGraphType<DateTimeGraphType>>("endTime");
            Field<NonNullGraphType<IntGraphType>>("sessionOriginId");
            Field<IntGraphType>("editedBy");
        }

    }
}
