namespace Time_Tracker.GraphQL.WorkReporting.Dtos
{
    public record class WorkReportRequest
    {
        public DateTimeOffset From { get; set; }
        public DateTimeOffset To { get; set; }
    }
}
