using Dapper;
using Microsoft.Data.SqlClient;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public class RolesRepository : IRolesRepository
    {
        private class DBRole
        {
            public int Id { get; set; }

            public required string Name { get; set; }

            public required string Permissions { get; set; }
        }

        private string _connectionString;

        public RolesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MSSQL")
                ?? throw new Exception("MSSQL connection string not seted.");
        }

        public void Delete(int roleId)
        {
            var sql = "DELETE FROM Roles WHERE Roles.Id = @roleId";

            using var connection = new SqlConnection(_connectionString);
            connection.Execute(sql, new { roleId });
        }

        public Role? Find(int roleId)
        {
            var sql = "SELECT * FROM Roles WHERE Roles.Id = @roleId";

            using var connection = new SqlConnection(_connectionString);

            var dbRole = connection.QueryFirst<DBRole>(sql, new { roleId });
            var role = new Role() { Id = dbRole.Id, Name = dbRole.Name, Permissions = [..dbRole.Permissions.Split(" ")] };

            return role;
        }

        public int Insert(Role role)
        {
            var sql = @"INSERT INTO Roles (Name, Permissions) 
                        VALUES (@name, @permissions);
                        SELECT CAST(SCOPE_IDENTITY() as int);";

            using var connection = new SqlConnection(_connectionString);
            return connection.QuerySingle(sql, new { name=role.Name,  permissions=string.Join(" ", role.Permissions)});
        }

        public void Update(int roleId, Role role)
        {
            var sql = "UPDATE Roles SET Name=@roleName, PERMISSIONS=@rolePermissions WHERE Roles.Id = @roleId";

            using var connection = new SqlConnection(_connectionString);
            connection.Execute(sql, new { roleId, roleName = role.Name, rolePermissions = string.Join(" ", role.Permissions) });
        }
    }
}
