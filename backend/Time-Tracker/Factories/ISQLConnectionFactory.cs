using Microsoft.Data.SqlClient;

namespace Time_Tracker.Factories
{
    public interface ISQLConnectionFactory
    {
        public SqlConnection GetSqlConnection();
    }
}
