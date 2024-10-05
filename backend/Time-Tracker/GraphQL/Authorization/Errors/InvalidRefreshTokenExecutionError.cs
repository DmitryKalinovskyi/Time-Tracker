using GraphQL;

namespace Time_Tracker.GraphQL.Authorization.Errors
{
    public class InvalidRefreshTokenExecutionError: ExecutionError
    {
        public InvalidRefreshTokenExecutionError(string message) : base(message) 
        {
            Code = "INVALID_REFRESH_TOKEN";
        }
    }
}
