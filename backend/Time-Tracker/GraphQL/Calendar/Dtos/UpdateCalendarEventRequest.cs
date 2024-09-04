namespace Time_Tracker.GraphQL.Calendar.Dtos
{
    public record class UpdateCalendarEventRequest(int Id, DateTime StartTime, DateTime EndTime)
    {
    }
}
