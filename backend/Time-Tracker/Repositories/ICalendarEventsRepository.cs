using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface ICalendarEventsRepository
    {
        public Task<CalendarEvent?> FindAsync(int id);
        public Task<List<CalendarEvent>> FindAllByUserIdAsync(int userId);

        public Task<int> InsertAsync(CalendarEvent calendarEvent);

        public Task UpdateAsync(CalendarEvent calendarEvent);

        public Task DeleteAsync(int id);
    }
}
