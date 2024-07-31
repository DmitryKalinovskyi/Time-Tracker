﻿using Dapper;
using Microsoft.Data.SqlClient;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories;

public class ActivationCodeRepository : IActivationCodeRepository
{
    private string _connectionString;

    public ActivationCodeRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("MSSQL")
            ?? throw new Exception("MSSQL connection string not seted.");
    }

    public async Task<ActivationCode?> Find(int id)
    {
        var sql = "SELECT  FROM ActiovationCodes WHERE Id = @id";

        using var connection = new SqlConnection(_connectionString);

        return await connection.QueryFirstOrDefaultAsync<ActivationCode>(sql, new { id });
    }

    public async Task<ActivationCode?> FindByValueAsync(Guid value)
    {
        var sql = "SELECT  FROM ActiovationCodes WHERE Value = @value";

        using var connection = new SqlConnection(_connectionString);

        return await connection.QueryFirstOrDefaultAsync<ActivationCode>(sql, new { value });
    }

    public async Task<int> AddAsync(ActivationCode code)
    {
        string sql = $@"INSERT INTO ActivationCodes 
                            (Value, UserId) 
                            OUTPUT INSERTED.Id
                            VALUES (@Value, @UserId)";

        using var connection = new SqlConnection(_connectionString);

        int userId = await connection.QuerySingleAsync<int>(sql, code);

        return userId;
    }

    public async Task UpdateAsync(User user)
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
