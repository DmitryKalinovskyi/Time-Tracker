using Time_Tracker.Factories;
using Time_Tracker.GraphQL.TimeTracking.Types;

namespace Time_Tracker.Services.WorkReport
{
    public class WorkReportBuilder(ISQLConnectionFactory sqlConnectionFactory)
    {
        private DateTimeOffset? _from;
        private DateTimeOffset? _to;

        public WorkReportBuilder From(DateTimeOffset from)
        {
            _from = from;
            return this;
        }

        public WorkReportBuilder To(DateTimeOffset to)
        {
            _to = to;
            return this;
        }

        public WorkReport BuildReport()
        {
            if (_from == null || _to == null)
                throw new InvalidOperationException("From and To parameters is required.");

            if (_from > _to)
                throw new InvalidOperationException("From should be before To.");

            // request to the database?
            using var sqlConnection = sqlConnectionFactory.GetSqlConnection();
            WorkReport report = new WorkReport();


            return report;
        }
    }
}
