using GraphQL;

namespace Time_Tracker.GraphQL.Authorization.Exceptions
{
    public class InvalidCredentialsExecutionError : ExecutionError
    {
        public InvalidCredentialsExecutionError(string message) : base(message)
        {
            Code = "INVALID_CREDENTIALS";
        }
    }
}
