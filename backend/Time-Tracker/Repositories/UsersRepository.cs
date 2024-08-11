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
        private class DBUser
        {
            public int Id { get; set; }

            public string FullName { get; set; }

            public string Email { get; set; }

            public string HashedPassword { get; set; }

            public string Salt { get; set; }

            public bool IsActive { get; set; } = false;

            public string? Permissions { get; set; }

            public string? RefreshToken { get; set; }

            public DateTime? RefreshTokenDateExpires { get; set; }

            public static User Deserialize(DBUser dbUser)
            {
                return new User
                {
                    Id = dbUser.Id,
                    FullName = dbUser.FullName,
                    Email = dbUser.Email,
                    HashedPassword = dbUser.HashedPassword,
                    Salt = dbUser.Salt,
                    IsActive = dbUser.IsActive,
                    Permissions = dbUser.Permissions?.Split(" ").ToList() ?? [],
                    RefreshToken = dbUser.RefreshToken,
                    RefreshTokenDateExpires = dbUser.RefreshTokenDateExpires,
                };
            }

            public static DBUser Serialize(User user)
            {
                return new DBUser
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    HashedPassword = user.HashedPassword,
                    Salt = user.Salt,
                    IsActive = user.IsActive,
                    Permissions = string.Join(" ", user.Permissions),
                    RefreshToken = user.RefreshToken,
                    RefreshTokenDateExpires = user.RefreshTokenDateExpires,
                };
            }
        }


        private string _connectionString;

        public UsersRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MSSQL")
                ?? throw new Exception("MSSQL connection string not seted.");
        }

        public async Task<List<User>> GetUsersAsync(int? first, int? afterId, int? last, int? beforeId)
        {
            var sql = new StringBuilder("SELECT TOP (@topCount) * FROM Users WHERE 1=1");

            if (afterId.HasValue)
            {
                sql.Append(" AND Id > @afterId");
            }

            if (beforeId.HasValue)
            {
                sql.Append(" AND Id < @beforeId");
            }

            var orderBy = "Id ASC";
            if (last.HasValue)
            {
                orderBy = "Id DESC";
            }
            sql.Append($" ORDER BY {orderBy}");

            using (var connection = new SqlConnection(_connectionString))
            {
                var dbUsers = await connection.QueryAsync<DBUser>(sql.ToString(), new { topCount = first ?? last ?? 10, afterId, beforeId }); // Default to 10 if neither first nor last is provided
                return dbUsers.Select(DBUser.Deserialize).AsList();
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

        public async Task<User?> FindAsync(int userId)
        {
            var sql = "SELECT * FROM Users WHERE Users.Id = @userId";

            using (var connection = new SqlConnection(_connectionString))
            {
                var dbUser = await connection.QueryFirstOrDefaultAsync<DBUser>(sql, new { userId });
                if (dbUser == null) return null;
                return DBUser.Deserialize(dbUser);
            }
        }

        public async Task<User?> FindByEmailAsync(string email)
        {
            var sql = "SELECT * FROM Users WHERE Users.Email = @email";

            using (var connection = new SqlConnection(_connectionString))
            {
                var dbUser = await connection.QueryFirstOrDefaultAsync<DBUser>(sql, new { email });
                if (dbUser == null) return null;
                return DBUser.Deserialize(dbUser);
            }
        }

        public async Task<int> AddAsync(User user)
        {
            string sql = $@"INSERT INTO Users 
                            (FullName, Email, IsActive) 
                            OUTPUT INSERTED.Id
                            VALUES (@FullName, @Email, @IsActive)";

            using var connection = new SqlConnection(_connectionString);

            int userId = await connection.QuerySingleAsync<int>(sql, user);

            return userId;
        }

        public async Task UpdateAsync(User user)
        {
            var dbUser = DBUser.Serialize(user);

            string query = $@"UPDATE Users SET 
                            FullName = @FullName, 
                            Email = @Email, 
                            HashedPassword = @HashedPassword, 
                            Salt = @Salt,
                            IsActive = @IsActive,
                            Permissions = @Permissions,
                            RefreshToken = @RefreshToken,
                            RefreshTokenDateExpires = @RefreshTokenDateExpires
                            WHERE Id = @Id";

            using var connection = new SqlConnection(_connectionString);

            await connection.ExecuteAsync(query, dbUser);
        }

        public async Task<IDictionary<int?, User>> GetUsersByIdAsync(List<int?> userIds)
        {
            var sql = "SELECT * FROM Users WHERE Id IN @UserIds";

            using var connection = new SqlConnection(_connectionString);

            var users = await connection.QueryAsync<User>(sql, new { UserIds = userIds });

            return (IDictionary<int?, User>)users.ToDictionary(u => u.Id);
        }
    }
}
