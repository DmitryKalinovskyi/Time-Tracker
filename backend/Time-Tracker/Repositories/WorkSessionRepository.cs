using Dapper;
using Microsoft.Data.SqlClient;
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

        public Task<List<WorkSession>> GetWorkSessionsWithSortingAsync(int? first, int? last, int? before, int? after)
        {

            throw new NotImplementedException();

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
