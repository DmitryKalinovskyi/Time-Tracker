﻿using Dapper;
using Microsoft.Data.SqlClient;
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

        public async Task AddUserAsync(User user)
        {
            string sql = $@"INSERT INTO Users 
                            (FullName, Email, RoleId) 
                            VALUES (@FullName, @Email, @RoleId)";

            using var connection = new SqlConnection(_connectionString);

            await connection.ExecuteAsync(sql, user);
        }

        public async Task UpdateUserAsync(User user)
        {
            string query = $@"UPDATE Users SET 
                            FullName = @FullName, 
                            Email = @Email, 
                            RoleId = @RoleId, 
                            Password = @HashedPassword, 
                            Salt = @Salt 
                            WHERE Id = @Id";

            using var connection = new SqlConnection(_connectionString);

            await connection.ExecuteAsync(query, user);
        }
    }
}
