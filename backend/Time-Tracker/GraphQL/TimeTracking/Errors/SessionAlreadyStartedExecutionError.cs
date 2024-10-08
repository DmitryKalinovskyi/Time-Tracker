using GraphQL;

namespace Time_Tracker.GraphQL.TimeTracking.Errors
{
    public class SessionAlreadyStartedExecutionError : ExecutionError
    {
        public SessionAlreadyStartedExecutionError(string message) : base(message)
        {
            Code = "SESSION_ALREADY_STARTED";
        }
    }
}
