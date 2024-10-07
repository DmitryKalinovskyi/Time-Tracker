using Dapper;
using Microsoft.Data.SqlClient;
using Time_Tracker.Enums;
using Time_Tracker.Helpers;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private class DBUser
        {
            public int Id { get; set; }

            public required string FullName { get; set; }

            public required string Email { get; set; }

            public string? HashedPassword { get; set; }

            public string? Salt { get; set; }

            public bool IsActive { get; set; } = false;

            public string? Permissions { get; set; }

            public string? RefreshToken { get; set; }

            public DateTime? RefreshTokenDateExpires { get; set; }

            public required string Position { get; set; }

            public int WorkHoursPerMonth { get; set; }


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
                    Permissions = dbUser.Permissions?.Split(' ', StringSplitOptions.RemoveEmptyEntries).ToList() ?? [],
                    RefreshToken = dbUser.RefreshToken,
                    RefreshTokenDateExpires = dbUser.RefreshTokenDateExpires,
                    Position = dbUser.Position,
                    WorkHoursPerMonth = dbUser.WorkHoursPerMonth,
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
                    Permissions = user.Permissions.Count > 0? string.Join(" ", user.Permissions): null,
                    RefreshToken = user.RefreshToken,
                    RefreshTokenDateExpires = user.RefreshTokenDateExpires,
                    Position = user.Position,
                    WorkHoursPerMonth = user.WorkHoursPerMonth,
                };
            }
        }


        private string _connectionString;

        public UsersRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MSSQL")
                ?? throw new Exception("MSSQL connection string not seted.");
        }

        public async Task<PaginationResult<User>> GetUsersWithPaginationAsync(PaginationRequest<UserSortableFields, UserFilterableFields, SQLOperators> request)
        {

            var (query, parameters) = PaginationHelper.BuildPaginatedQuery("Users", request);

            var countQuery = PaginationHelper.BuildCountQuery("Users", request);

            IEnumerable<DBUser> paginatedData = [];

            var totalRecords = 0;

            using (var connection = new SqlConnection(_connectionString))
            {
                paginatedData = await connection.QueryAsync<DBUser>(query, parameters);
                totalRecords = await connection.ExecuteScalarAsync<int>(countQuery, parameters);
            }

            var totalPages = (int)Math.Ceiling((double)totalRecords / request.PageSize);

            return new PaginationResult<User>
            {
                Results = paginatedData.Select(DBUser.Deserialize),
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                CurrentPage = request.PageNumber,
                PageSize = request.PageSize
            };
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
                            RefreshTokenDateExpires = @RefreshTokenDateExpires,
                            Position = @Position,
                            WorkHoursPerMonth = @WorkHoursPerMonth
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

        public async Task<List<User>> SearchByEmailOrFullname(string emailOrFullName, int limit)
        {
            var sql = "SELECT TOP(@limit) * FROM Users WHERE Email LIKE @emailOrFullName OR FullName LIKE @emailOrFullName";

            using var connection = new SqlConnection(_connectionString);

            var dbUsers = await connection.QueryAsync<DBUser>(sql, new { emailOrFullName = $"%{emailOrFullName}%", limit});

            return dbUsers.Select(DBUser.Deserialize).ToList();
        }
    }
}
