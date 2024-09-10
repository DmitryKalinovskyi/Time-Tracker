namespace Time_Tracker.GraphQL.Calendar.Dtos
{
    public record class CreateCalendarEventRequest(DateTime StartTime, DateTime EndTime)
    {
    }
}
