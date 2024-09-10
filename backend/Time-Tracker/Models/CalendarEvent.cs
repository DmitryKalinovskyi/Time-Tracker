namespace Time_Tracker.Models
{
    public class CalendarEvent
    {
        public int Id { get; set; }

        public int UserId { get; set; }    

        public DateTimeOffset StartTime { get; set; }

        public DateTimeOffset EndTime { get; set; }
    }
}
