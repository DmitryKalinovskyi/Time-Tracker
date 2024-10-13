using GraphQL;

namespace Time_Tracker.GraphQL.TimeTracking.Errors
{
    public class WorkSessionDoesNotExistExecutionError : ExecutionError
    {
        public WorkSessionDoesNotExistExecutionError(string message): base(message)
        {
            Code = "WORK_SESSION_DOES_NOT_EXIST";
        }
    }
}
