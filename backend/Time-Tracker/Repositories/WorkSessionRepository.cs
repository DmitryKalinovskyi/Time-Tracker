using Dapper;
using Microsoft.Data.SqlClient;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public class WorkSessionRepository : IWorkSessionsRepository
    {
        private string _connectionString;

        public WorkSessionRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MSSQL")
                ?? throw new Exception("MSSQL connection string not seted.");
        }

        public async Task<int> AddWorkSessionAsync(WorkSession workSession)
        {
            string sql = $@"INSERT INTO WorkSessions 
                            (UserId, StartTime, SessionOriginId, EditedBy) 
                            OUTPUT INSERTED.Id
                            VALUES (@UserId, GETUTCDATE(), @SessionOriginId, @EditedBy)";

            using var connection = new SqlConnection(_connectionString);

            int workSessionId = await connection.QuerySingleAsync<int>(sql, workSession);

            return workSessionId;
        }

        public async Task DeleteWorkSessionAsync(int id)
        {
            string sql = $@"DELETE FROM WorkSessions
                        WHERE Id = @Id";

            using var connection = new SqlConnection(_connectionString);

            await connection.QuerySingleAsync<int>(sql, id);

        }

        public Task<WorkSession> GetWorkSessionByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<WorkSession>> GetWorkSessionsWithSortingAsync(int? first, int? last, int? before, int? after)
        {
            throw new NotImplementedException();
        }

        public Task UpdateWorkSessionAsync(WorkSession workSession)
        {
            throw new NotImplementedException();
        }
    }
}
