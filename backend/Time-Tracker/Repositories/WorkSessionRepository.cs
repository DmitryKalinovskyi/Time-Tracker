using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using Time_Tracker.Models;
using static Time_Tracker.Repositories.IWorkSessionRepository;

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
                            OUTPUT INSERTED.Id, INSERTED.StartTime, INSERTED.EndTime
                            VALUES (@UserId, COALESCE(@StartTime, GETUTCDATE()), @EndTime, @SessionOriginId, @EditedBy)";

            using var connection = new SqlConnection(_connectionString);

            return await connection.QuerySingleAsync<WorkSession>(sql, workSession);
        }

        public async Task DeleteWorkSessionAsync(int id)
        {
            string sql = $@"DELETE FROM WorkSessions
                        WHERE Id = @Id";

            using var connection = new SqlConnection(_connectionString);

            await connection.QuerySingleAsync(sql, id);

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

        public async Task UpdateWorkSessionAsync(WorkSession workSession)
        {
            var sql = $@"UPDATE WorkSessions SET
                         UserId = @UserId
                         StartTime = @StartTime
                         EndTime = COALESCE(@EndTime, GETUTCDATE())
                         SessionOriginId = @SessionOriginId
                         EditedBy = @EditedBy";

            using var connection = new SqlConnection(_connectionString);

            await connection.ExecuteAsync(sql, workSession);
        }
    }
}
