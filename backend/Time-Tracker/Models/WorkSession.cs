using Microsoft.Identity.Client;

namespace Time_Tracker.Models
{
    public class WorkSession
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTimeOffset? StartTime { get; set; }

        public DateTimeOffset? EndTime { get; set; }

        public int SessionOriginId { get; set; }

        public long? Duration { get; set; }

        public int? EditedBy { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public DateTimeOffset LastUpdatedAt { get; set; }
    }
}
