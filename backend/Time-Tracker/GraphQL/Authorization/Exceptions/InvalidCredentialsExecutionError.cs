using GraphQL;
using System.Collections;

namespace Time_Tracker.GraphQL.Authorization.Exceptions
{
    public class InvalidCredentialsExecutionError : ExecutionError
    {
        public InvalidCredentialsExecutionError(string message, IDictionary data) : base(message, data) { }

        public InvalidCredentialsExecutionError(string message) : base(message) { }

        public InvalidCredentialsExecutionError(string message, Exception? innerException)
            : base(message, innerException) { }
    }
}
