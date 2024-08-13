using Dapper;
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

        public async Task<(IEnumerable<WorkSession>, bool HasNextPage, bool HasPrevPage)> GetWorkSessionsWithPagination(int? first, int? last, int? beforeId, int? afterId)
        {
            var sql = @"WITH FilteredCTE AS (
                            SELECT 
                                *,
                                ROW_NUMBER() OVER (ORDER BY Id ASC) AS RowAsc,
                                ROW_NUMBER() OVER (ORDER BY Id DESC) AS RowDesc
                            FROM 
                                WorkSessions
                            WHERE 
                                (@afterId IS NULL OR Id > @afterId) AND 
                                (@beforeId IS NULL OR Id < @beforeId)
                        ),
                        PagedResults AS (
                            SELECT 
                                *
                            FROM 
                                FilteredCTE
                            WHERE
                                (@first IS NOT NULL AND RowAsc <= @first) OR
                                (@last IS NOT NULL AND RowDesc <= @last)
                        ),
                        CheckNextPage AS (
                            SELECT 1 AS HasNextPage 
                            FROM FilteredCTE
                            WHERE
                                (@first IS NOT NULL AND RowAsc > @first) OR
                                (@last IS NOT NULL AND RowDesc > @last)
                        ),
                        CheckPrevPage AS (
                            SELECT 1 AS HasPrevPage
                            FROM FilteredCTE
                            WHERE
                                (@afterId IS NOT NULL AND RowAsc > 1) OR
                                (@beforeId IS NOT NULL AND RowDesc > 1)
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
                            ISNULL((SELECT TOP 1 HasPrevPage FROM CheckPrevPage), 0) AS HasPrevPage
                        FROM 
                            PagedResults
                        ORDER BY Id ASC;";

            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new
                {
                    first,
                    last,
                    beforeId,
                    afterId
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

                bool hasNextPage = result.Any() && (int)result.First().HasNextPage == 1;
                bool hasPrevPage = result.Any() && (int)result.First().HasPrevPage == 1;

                return (items, hasNextPage, hasPrevPage);
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
