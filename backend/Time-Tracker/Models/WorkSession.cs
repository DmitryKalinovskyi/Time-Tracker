using Microsoft.Identity.Client;

namespace Time_Tracker.Models
{
    public class WorkSession
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public int SessionOriginId { get; set; }

        public long? Duration { get; set; }

        public int? EditedBy { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastUpdatedAt { get; set; }
    }
}
