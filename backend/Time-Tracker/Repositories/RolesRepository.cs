using Dapper;
using Microsoft.Data.SqlClient;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public class RolesRepository : IRolesRepository
    {
        private string _connectionString;

        public RolesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MSSQL")
                ?? throw new Exception("MSSQL connection string not seted.");
        }

        public Role? Find(int roleId)
        {
            var sql = "SELECT * FROM Roles WHERE Roles.Id = @roleId";

            using(var connection = new SqlConnection(_connectionString))
            {
                return connection.QueryFirst<Role>(sql, new { roleId });
            }
        }
    }
}
