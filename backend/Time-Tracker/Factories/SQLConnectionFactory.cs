using Microsoft.Data.SqlClient;

namespace Time_Tracker.Factories
{
    public class SQLConnectionFactory(string connectionString) : ISQLConnectionFactory
    {
        public SqlConnection GetSqlConnection()
        {
            return new SqlConnection(connectionString);
        }
    }
}
