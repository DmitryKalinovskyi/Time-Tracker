using Dapper;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Data.SqlClient;
using System.Text;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public class WorkSessionRepository : IWorkSessionRepository
    {
        private string _connectionString;

        public WorkSessionRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MSSQL")
                ?? throw new Exception("MSSQL connection string not seted.");
        }

        public async Task<WorkSession> AddWorkSessionAsync(WorkSession workSession)
        {

            if (workSession == null)
                throw new ArgumentNullException(nameof(workSession));

            string sql = $@"INSERT INTO WorkSessions 
                            (UserId, StartTime, EndTime, SessionOriginId, EditedBy) 
                            OUTPUT 
                                INSERTED.Id,
                                INSERTED.UserId,
                                INSERTED.StartTime, 
                                INSERTED.EndTime,
                                INSERTED.Duration,
                                INSERTED.SessionOriginId,
                                INSERTED.EditedBy,
                                INSERTED.CreatedAt,
                                INSERTED.LastUpdatedAt
                            VALUES (@UserId, COALESCE(@StartTime, GETUTCDATE()), @EndTime, @SessionOriginId, @EditedBy)";

            using var connection = new SqlConnection(_connectionString);

            return await connection.QuerySingleAsync<WorkSession>(sql, workSession);
        }

        public async Task DeleteWorkSessionAsync(int id)
        {
            string sql = $@"DELETE FROM WorkSessions
                        WHERE Id = @Id";

            using var connection = new SqlConnection(_connectionString);

            await connection.ExecuteAsync(sql, new {Id = id});

        }

        public async Task<WorkSession?> GetWorkSessionByIdAsync(int id)
        {
            var sql = $@"SELECT *
                    FROM WorkSessions
                    WHERE Id = @id";

            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryFirstOrDefaultAsync<WorkSession?>(sql, new { id });

        }

        public async Task<(IEnumerable<WorkSession>, bool HasNextPage, bool HasPrevPage, int? totalNumber)> GetWorkSessionsWithPagination(int? first, 
            int? last, 
            int? beforeId, 
            int? afterId,
            int? userId,
            int? year,
            int? month,
            int? day)
        {
            var sql = @"WITH FilteredCTE AS (
                            SELECT 
                                *
                            FROM 
                                WorkSessions
                            WHERE 
                                (@userId IS NULL OR UserId = @userId) AND
                                (@year IS NULL OR YEAR(StartTime) = @year) AND
                                (@month IS NULL OR MONTH(StartTime) = @month) AND
                                (@day IS NULL OR DAY(StartTime) = @day)
                        ),
                        SortedResults AS (
                            SELECT 
                                *,
                                ROW_NUMBER() OVER (ORDER BY StartTime DESC) AS RowNum,
                                COUNT(*) OVER () AS TotalRows
                            FROM 
                                FilteredCTE
                            WHERE 
                                (@afterId IS NULL OR StartTime < (select StartTime from WorkSessions where id = @afterId) ) AND 
                                (@beforeId IS NULL OR StartTime > (select StartTime from WorkSessions where id = @beforeId))
                        ),
						PagedResults as (
						Select 
							*
						From
							SortedResults
						Where
							(@first is null or RowNum <= @first) AND
							(@last is null or RowNum > (TotalRows - @last))
						),
                        CheckNextPage AS (
                            SELECT 1 AS HasNextPage 
                            FROM FilteredCTE
                            WHERE 
                                StartTime < (SELECT MIN(StartTime) FROM PagedResults)
                        ),
                        CheckPrevPage AS (
                            SELECT 1 AS HasPrevPage 
                            FROM FilteredCTE
                            WHERE 
                                StartTime > (SELECT MAX(StartTime) FROM PagedResults)
                        )
                        SELECT 
                            Id,
                            UserId,
                            StartTime,
                            EndTime,
                            SessionOriginId,
                            Duration,
                            EditedBy,
                            CreatedAt,
                            LastUpdatedAt,
                            ISNULL((SELECT TOP 1 HasNextPage FROM CheckNextPage), 0) AS HasNextPage,
                            ISNULL((SELECT TOP 1 HasPrevPage FROM CheckPrevPage), 0) AS HasPrevPage,
                            TotalRows as TotalNumber
                        FROM 
                            PagedResults";

            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new
                {
                    first,
                    last,
                    beforeId,
                    afterId,
                    userId,
                    year,
                    month,
                    day
                };

                var result = await connection.QueryAsync<dynamic>(sql, parameters);

                var items = result.Select(r => new WorkSession
                {
                    Id = (int)r.Id,
                    UserId = (int)r.UserId,
                    StartTime = (DateTime?)r.StartTime,
                    EndTime = (DateTime?)r.EndTime,
                    SessionOriginId = (int)r.SessionOriginId,
                    Duration = (long?)r.Duration,
                    EditedBy = (int?)r.EditedBy,
                    CreatedAt = (DateTime)r.CreatedAt,
                    LastUpdatedAt = (DateTime)r.LastUpdatedAt
                }).ToList();

                bool hasNextPage = result.Any() ? result.First().HasNextPage == 1 : false;
                bool hasPrevPage = result.Any() ? result.First().HasPrevPage == 1 : false;
                int? totalNumber = result.Any() ? result.First().TotalNumber : null;

                return (items, hasNextPage, hasPrevPage, totalNumber);
            }

        }

        public async Task<WorkSession> UpdateWorkSessionAsync(WorkSession workSession)
        {
            var sql = @"
                        UPDATE WorkSessions SET
                            UserId = @UserId,
                            StartTime = @StartTime,
                            EndTime = COALESCE(@EndTime, GETUTCDATE()),
                            SessionOriginId = @SessionOriginId,
                            EditedBy = @EditedBy,
                            LastUpdatedAt = GETUTCDATE()
                        OUTPUT 
                            INSERTED.Id,
                            INSERTED.UserId,
                            INSERTED.StartTime,
                            INSERTED.EndTime,
                            INSERTED.Duration,
                            INSERTED.SessionOriginId,
                            INSERTED.EditedBy,
                            INSERTED.CreatedAt,
                            INSERTED.LastUpdatedAt
                        WHERE Id = @Id;
                    ";

            using var connection = new SqlConnection(_connectionString);

            return await connection.QuerySingleAsync<WorkSession>(sql, workSession);
        }
    }
}
