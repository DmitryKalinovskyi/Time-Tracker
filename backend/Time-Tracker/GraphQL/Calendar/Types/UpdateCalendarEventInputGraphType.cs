using GraphQL.Types;
using Time_Tracker.GraphQL.Calendar.Dtos;
using Time_Tracker.Models;

namespace Time_Tracker.GraphQL.Calendar.Types
{
    public class UpdateCalendarEventInputGraphType: InputObjectGraphType<UpdateCalendarEventRequest>
    {
        public UpdateCalendarEventInputGraphType()
        {
            Field(x => x.Id);
            Field(x => x.StartTime);
            Field(x => x.EndTime);
        }
    }
}
