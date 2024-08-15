using Dapper;
using Microsoft.Data.SqlClient;
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

        public async Task<(IEnumerable<User>, bool HasNextPage, bool HasPrevPage)> GetUsersAsync(int? first, int? afterId, int? last, int? beforeId)
        {

            var sql = @"WITH SortedResults AS (
                                SELECT 
                                    *,
                                    ROW_NUMBER() OVER (ORDER BY Id ASC) AS RowNum,
                                    COUNT(*) OVER () AS TotalRows
                                FROM 
                                    Users
                                WHERE 
                                    (@afterId IS NULL OR Id > @afterId) AND 
                                    (@beforeId IS NULL OR Id < @beforeId)
                            ),
                            PagedResults AS (
                                SELECT 
                                    *
                                FROM 
                                    SortedResults
                                WHERE 
                                    (@first IS NOT NULL AND RowNum <= @first) OR
                                    (@last IS NOT NULL AND RowNum > (TotalRows - @last))
                            ),
                            CheckNextPage AS (
                                SELECT 1 AS HasNextPage 
                                FROM Users
                                WHERE 
                                    Id > (SELECT MAX(Id) FROM PagedResults)
                            ),
                            CheckPrevPage AS (
                                SELECT 1 AS HasPrevPage 
                                FROM Users
                                WHERE 
                                    Id < (SELECT MIN(Id) FROM PagedResults)
                            )
                            SELECT 
                                Id,
                                Email,
                                FullName,
                                HashedPassword,
                                Salt,
                                IsActive,
                                Permissions,
                                RefreshToken,
                                RefreshTokenDateExpires,
                                ISNULL((SELECT TOP 1 HasNextPage FROM CheckNextPage), 0) AS HasNextPage,
                                ISNULL((SELECT TOP 1 HasPrevPage FROM CheckPrevPage), 0) AS HasPrevPage
                            FROM 
                                PagedResults;

                                        ";

            using (var connection = new SqlConnection(_connectionString))
            {
                var parameters = new
                {
                    first,
                    last,
                    beforeId,
                    afterId,
                };

                var result = await connection.QueryAsync<dynamic>(sql, parameters);

                var items = result.Select(r => new DBUser
                {
                    Id = (int)r.Id,
                    FullName = (string)r.FullName,
                    Email = (string)r.Email,
                    HashedPassword = (string)r.HashedPassword,
                    Salt = (string)r.Salt,
                    IsActive = r.IsActive,
                    Permissions = r.Permissions,
                    RefreshToken = (string?)r.RefreshToken,
                    RefreshTokenDateExpires = (DateTime?)r.RefreshTokenDateExpires
                }).Select(DBUser.Deserialize).ToList();

                bool hasNextPage = result.Any() && (result.FirstOrDefault(r => r.HasNextPage != null)?.HasNextPage ?? 0) == 1;
                bool hasPrevPage = result.Any() && (result.FirstOrDefault(r => r.HasPrevPage != null)?.HasPrevPage ?? 0) == 1;

                return (items, hasNextPage, hasPrevPage);
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

        public async Task<IDictionary<int, User>> GetUsersByIdAsync(IEnumerable<int> userIds)
        {
            var sql = "SELECT * FROM Users WHERE Id IN @UserIds";

            using var connection = new SqlConnection(_connectionString);

            var users = await connection.QueryAsync<DBUser>(sql, new { UserIds = userIds });

            return users.Select(DBUser.Deserialize).ToDictionary(u => u.Id);
        }
    }
}
