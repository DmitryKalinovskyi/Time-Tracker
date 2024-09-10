using GraphQL.Types;
using Time_Tracker.GraphQL.Calendar.Dtos;

namespace Time_Tracker.GraphQL.Calendar.Types
{
    public class CreateCalendarEventInputGraphType: InputObjectGraphType<CreateCalendarEventRequest>
    {
        public CreateCalendarEventInputGraphType()
        {
            Field(x => x.StartTime);
            Field(x => x.EndTime);
        }
    }
}
