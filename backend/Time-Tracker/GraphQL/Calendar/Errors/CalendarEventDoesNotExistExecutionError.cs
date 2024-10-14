using GraphQL;

namespace Time_Tracker.GraphQL.Calendar.Errors
{
    public class CalendarEventDoesNotExistExecutionError: ExecutionError
    {
        public CalendarEventDoesNotExistExecutionError(string message) : base(message)
        {
            Code = "CALENDAR_EVENT_DOES_NOT_EXIST";
        }
    }
}
