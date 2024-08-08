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

            var dbRole = connection.QueryFirstOrDefault<DBRole>(sql, new { roleId });
            if (dbRole == null) return null;

            var role = new Role() { Id = dbRole.Id, Name = dbRole.Name, Permissions = [..dbRole.Permissions.Split(" ")] };

            return role;
        }

        public int Insert(Role role)
        {
            var sql = @"INSERT INTO Roles (Name, Permissions) 
                        VALUES (@name, @permissions);
                        SELECT CAST(SCOPE_IDENTITY() as int);";

            using var connection = new SqlConnection(_connectionString);
            return connection.QuerySingle<int>(sql, new { name=role.Name,  permissions=string.Join(" ", role.Permissions)});
        }

        public void Update(Role role)
        {
            var sql = "UPDATE Roles SET Name=@roleName, PERMISSIONS=@rolePermissions WHERE Roles.Id = @roleId";

            using var connection = new SqlConnection(_connectionString);
            connection.Execute(sql, new { roleId = role.Id, roleName = role.Name, rolePermissions = string.Join(" ", role.Permissions) });
        }

        public List<Role> GetRoles()
        {
            var sql = "SELECT * FROM Roles";

            using var connection = new SqlConnection(_connectionString);
            var roles = connection.Query<DBRole>(sql) ?? [];
            return roles.Select(dbRole => new Role() { Id = dbRole.Id, Name = dbRole.Name, Permissions = [.. dbRole.Permissions.Split(" ")] }).ToList();
        }
    }
}
