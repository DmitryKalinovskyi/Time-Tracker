using Dapper;
using Time_Tracker.Factories;
using Time_Tracker.Models;

namespace Time_Tracker.Services.WorkReport
{
    public class WorkReportBuilder(ISQLConnectionFactory sqlConnectionFactory)
    {
        private DateTimeOffset? _from;
        private DateTimeOffset? _to;

        public WorkReportBuilder From(DateTimeOffset from)
        {
            _from = from;
            return this;
        }

        public WorkReportBuilder To(DateTimeOffset to)
        {
            _to = to;
            return this;
        }

        // attach pagination and user filters in the future.

        public async Task<WorkReport> BuildReport()
        {
            if (_from == null || _to == null)
                throw new InvalidOperationException("From and To parameters is required.");

            if (_from > _to)
                throw new InvalidOperationException("From should be before To.");

            using var sqlConnection = sqlConnectionFactory.GetSqlConnection();

            var sql = $@"SELECT Users.*, 
       WorkSessionsSummary.TrackedTime
FROM Users
INNER JOIN (
    SELECT UserId, 
           SUM(WorkSessions.Duration) AS TrackedTime
    FROM WorkSessions
    WHERE WorkSessions.StartTime >= @StartTime 
      AND WorkSessions.EndTime <= @EndTime
    GROUP BY UserId
) AS WorkSessionsSummary ON Users.Id = WorkSessionsSummary.UserId;";

            var results = await sqlConnection.QueryAsync(sql, new { StartTime = _from, EndTime = _to });

            var users = results.Select(result =>
            {
                var user = new User()
                {
                    Id = result.Id,
                    FullName = result.FullName,
                    Email = result.Email,
                    HashedPassword = result.HashedPassword,
                    IsActive = result.IsActive,
                    Permissions = ((string)result.Permissions)?.Split(' ', StringSplitOptions.RemoveEmptyEntries).ToList() ?? [],
                    RefreshTokenDateExpires = result.RefreshTokenDateExpires,
                    RefreshToken = result.RefreshToken,
                    Salt = result.Salt
                };

                var userReport = new UserReport()
                {
                    User = user,
                    TrackedHours = (int)Math.Round(result.TrackedTime  / 3600.0)
                };
                return userReport;
            });

            var report = new WorkReport()
            {
                Users = users.ToList()
            };

            return report;
        }
    }
}
