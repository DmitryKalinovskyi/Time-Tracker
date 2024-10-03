namespace Time_Tracker.GraphQL.WorkReporting.Dtos
{
    public record class WorkReportRequest
    {
        public DateTimeOffset From { get; set; }
        public DateTimeOffset To { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }
    }
}
