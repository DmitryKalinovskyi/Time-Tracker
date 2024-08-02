using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Identity.Client;
using System.Text;
using System.Threading.Tasks;
using Time_Tracker.Dtos;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private string _connectionString;

        public UsersRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MSSQL")
                ?? throw new Exception("MSSQL connection string not seted.");
        }

        public async Task<List<User>> GetUsersAsync(int? first, int? afterId, int? last, int? beforeId)
        {
            var sql = new StringBuilder("SELECT * FROM Users WHERE 1=1");

            if (afterId.HasValue)
            {
                sql.Append(" AND Id > @afterId");
            }

            if (beforeId.HasValue)
            {
                sql.Append(" AND Id < @beforeId");
            }

            sql.Append(" ORDER BY Id ASC");

            if (first.HasValue)
            {
                sql.Append(" OFFSET 0 ROWS FETCH NEXT @first ROWS ONLY");
            }
            else if (last.HasValue)
            {
                sql.Append(" OFFSET (SELECT COUNT(*) FROM Users WHERE (@beforeId IS NULL OR Id < @beforeId) AND (@afterId IS NULL OR Id > @afterId)) - @last ROWS FETCH NEXT @last ROWS ONLY");
            }

            using (var connection = new SqlConnection(_connectionString))
            {
                var users =  await connection.QueryAsync<User>(sql.ToString(), new { first, afterId, last, beforeId });
                return users.AsList();
            }
        }

        public async Task<int> GetTotalUsersCount()
        {
            var sql = "SELECT COUNT(*) FROM USERS";

            using (var connection = new SqlConnection(_connectionString))
            {
                var totalCount = await connection.QuerySingleAsync<int>(sql);

                return totalCount;
            }

        }

        public User? Find(int userId)
        {
            var sql = "SELECT * FROM Users WHERE Users.Id = @userId";

            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.QueryFirstOrDefault<User>(sql, new { userId });
            }
        }

        public User? FindByEmail(string email)
        {
            var sql = "SELECT * FROM Users WHERE Users.Email = @email";

            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.QueryFirstOrDefault<User>(sql, new { email });
            }
        }

        public async Task<int> AddAsync(User user)
        {
            string sql = $@"INSERT INTO Users 
                            (FullName, Email) 
                            OUTPUT INSERTED.Id
                            VALUES (@FullName, @Email)";

            using var connection = new SqlConnection(_connectionString);

            int userId = await connection.QuerySingleAsync<int>(sql, user);

            return userId;
        }

        public async Task UpdateAsync(User user)
        {
            string query = $@"UPDATE Users SET 
                            FullName = @FullName, 
                            Email = @Email, 
                            RoleId = @RoleId, 
                            HashedPassword = @HashedPassword, 
                            Salt = @Salt
                            WHERE Id = @Id";

            using var connection = new SqlConnection(_connectionString);

            await connection.ExecuteAsync(query, user);
        }

        public async Task DeleteAsync(int userId)
        {
            throw new NotImplementedException();
        }


    }
}
