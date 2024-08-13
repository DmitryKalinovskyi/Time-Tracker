using Dapper;
using Microsoft.Data.SqlClient;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public class SessionOriginRepository : ISessionOriginRepository
    {
        private string _connectionString;

        public SessionOriginRepository(IConfiguration configuration) 
        {
            _connectionString = configuration.GetConnectionString("MSSQL")
                ?? throw new Exception("MSSQL connection string not seted.");
        }

        public async Task<SessionOrigin?> GetSessionOriginByIdAsync(int id)
        {
            var sql = @"SELECT * FROM SessionOrigins WHERE Id = @Id";

            using (var connection = new SqlConnection(_connectionString))
            {
                var sessionOrigin = await connection.QueryFirstOrDefaultAsync<SessionOrigin>(sql, new { id });
                return sessionOrigin;
            }
        }

        public async Task<IDictionary<int, SessionOrigin>> GetSessionOriginsByIdAsync(IEnumerable<int> originsIds)
        {
            var sql = "SELECT * FROM SessionOrigins WHERE Id IN @OriginsIds";

            using var connection = new SqlConnection(_connectionString);

            var sessionOrgins = await connection.QueryAsync<SessionOrigin>(sql, new { OriginsIds = originsIds });

            return sessionOrgins.ToDictionary(u => u.Id);
        }
    }
}
