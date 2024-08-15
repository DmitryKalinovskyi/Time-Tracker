using GraphQL;

namespace Time_Tracker.GraphQL.Authorization.Exceptions
{
    public class UserNotFoundedExecutionError : ExecutionError
    {
        public UserNotFoundedExecutionError(): base("User not founded.")
        {
        }

        public UserNotFoundedExecutionError(string message) : base(message)
        {
        }
        public UserNotFoundedExecutionError(string message, Exception? innerException)
            : base(message, innerException)
        {
        }
    }
}
