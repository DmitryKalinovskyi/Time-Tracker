using GraphQL;

namespace Time_Tracker.GraphQL.TimeTracking.Errors
{
    public class WorkSessionsOverlapsExecutionError : ExecutionError
    {
        public WorkSessionsOverlapsExecutionError(string message) : base(message)
        {
            Code = "WORK_SESSIONS_OVERLAPS";
        }
    }
}
