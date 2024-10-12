using GraphQL;

namespace Time_Tracker.GraphQL.TimeTracking.Errors
{
    public class UserDoesNotExistExecutionError : ExecutionError
    {
        public UserDoesNotExistExecutionError(string message) : base(message)
        {
            Code = "USER_DOES_NOT_EXIST";   
        }
    }
}
