using GraphQL.Types;
using Time_Tracker.GraphQL.Calendar.Dtos;

namespace Time_Tracker.GraphQL.Calendar.Types
{
    public class InputGetCalendarEventsGraphType: InputObjectGraphType<GetCalendarEventsRequest>
    {
        public InputGetCalendarEventsGraphType()
        {
            Field(x => x.UserId);
            Field(x => x.From);
            Field(x => x.To);
        }
    }
}
