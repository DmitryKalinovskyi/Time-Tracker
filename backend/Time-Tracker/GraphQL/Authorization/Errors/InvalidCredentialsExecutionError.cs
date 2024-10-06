using GraphQL;

namespace Time_Tracker.GraphQL.Authorization.Errors
{
    public class InvalidCredentialsExecutionError : ExecutionError
    {
        public InvalidCredentialsExecutionError(string message) : base(message)
        {
            Code = "INVALID_CREDENTIALS";
        }
    }
}
