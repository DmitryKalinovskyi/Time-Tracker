using Dapper;
using Microsoft.Data.SqlClient;
using Time_Tracker.Factories;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public class CalendarEventsRepository(ISQLConnectionFactory sqlConnectionFactory) : ICalendarEventsRepository
    {
        public async Task DeleteAsync(int id)
        {
            using SqlConnection connection = sqlConnectionFactory.GetSqlConnection();

            await connection.ExecuteAsync("DELETE FROM CalendarEvents WHERE Id = @id", new { id});
        }

        public async Task<List<CalendarEvent>> FindAllByUserIdAsync(int userId)
        {
            using SqlConnection connection = sqlConnectionFactory.GetSqlConnection();
            return [.. await connection.QueryAsync<CalendarEvent>("SELECT * FROM CalendarEvents WHERE UserId = @userId", new { userId })];
        }

        public async Task<CalendarEvent?> FindAsync(int id)
        {
            using SqlConnection connection = sqlConnectionFactory.GetSqlConnection();

            return await connection.QuerySingleOrDefaultAsync<CalendarEvent>("SELECt * FROM CalendarEvents WHERE Id = @id", new { id });
        }

        public async Task<List<CalendarEvent>> FindEventsByUserAndDateRangeAsync(int userId, DateTimeOffset from, DateTimeOffset to)
        {
            using SqlConnection connection = sqlConnectionFactory.GetSqlConnection();
            var sql = @"SELECT * FROM CalendarEvents WHERE UserId = @userId AND StartTime >= @from AND EndTime <= @to";
            return [.. await connection.QueryAsync<CalendarEvent>(sql, new { userId, from, to })];
        }

        public async Task<int> InsertAsync(CalendarEvent calendarEvent)
        {
            using SqlConnection connection = sqlConnectionFactory.GetSqlConnection();

            string sql = $@"INSERT INTO CalendarEvents 
                            (UserId, StartTime, EndTime) 
                            OUTPUT INSERTED.Id
                            VALUES (@UserId, @StartTime, @EndTime)";

            int id = await connection.QuerySingleAsync<int>(sql, calendarEvent);

            return id;
        }

        public async Task UpdateAsync(CalendarEvent calendarEvent)
        {
            using SqlConnection connection = sqlConnectionFactory.GetSqlConnection();

            string sql = $@"UPDATE CalendarEvents SET 
                            UserId = @UserId, 
                            StartTime = @StartTime,
                            EndTime = @EndTime
                            WHERE Id = @Id";

            await connection.ExecuteAsync(sql, calendarEvent);
        }
    }
}
