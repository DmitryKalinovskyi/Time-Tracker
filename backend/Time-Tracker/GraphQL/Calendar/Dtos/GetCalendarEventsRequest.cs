namespace Time_Tracker.GraphQL.Calendar.Dtos
{
    public record class GetCalendarEventsRequest(DateTimeOffset From, DateTimeOffset To, int UserId) { }
}
