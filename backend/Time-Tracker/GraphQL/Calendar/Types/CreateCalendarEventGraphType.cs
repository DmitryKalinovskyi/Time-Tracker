using GraphQL.Types;
using Time_Tracker.GraphQL.Calendar.Dtos;

namespace Time_Tracker.GraphQL.Calendar.Types
{
    public class CreateCalendarEventGraphType: InputObjectGraphType<CreateCalendarEventRequest>
    {
        public CreateCalendarEventGraphType()
        {
            Field(x => x.StartTime);
            Field(x => x.EndTime);
        }
    }
}
