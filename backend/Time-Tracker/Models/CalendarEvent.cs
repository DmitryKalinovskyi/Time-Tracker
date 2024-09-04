namespace Time_Tracker.Models
{
    public class CalendarEvent
    {
        public int Id { get; set; }

        public int UserId { get; set; }    

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }
    }
}
