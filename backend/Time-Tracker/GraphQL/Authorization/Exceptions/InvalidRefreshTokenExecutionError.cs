using GraphQL;

namespace Time_Tracker.GraphQL.Authorization.Exceptions
{
    public class InvalidRefreshTokenExecutionError: ExecutionError
    {
        public InvalidRefreshTokenExecutionError(string message) : base(message) { }

        public InvalidRefreshTokenExecutionError(string message, Exception? innerException)
            : base(message, innerException) { }
    }
}
