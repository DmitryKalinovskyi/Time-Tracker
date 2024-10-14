using GraphQL;
using GraphQL.Types;
using Time_Tracker.GraphQL.Calendar.Dtos;
using Time_Tracker.GraphQL.Calendar.Types;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Calendar
{
    public class CalendarQuery: ObjectGraphType
    {
        public CalendarQuery(ICalendarEventsRepository calendarEventsRepository) 
        {
            Field<NonNullGraphType<ListGraphType<NonNullGraphType<CalendarEventGraphType>>>>("calendar")
                .Argument<NonNullGraphType<IntGraphType>>("userId")
                .ResolveAsync(async (context) =>
                {
                    int userId = context.GetArgument<int>("userId");
                    return await calendarEventsRepository.FindAllByUserIdAsync(userId);
                });

            Field<NonNullGraphType<ListGraphType<NonNullGraphType<CalendarEventGraphType>>>>("calendarByTimeRange")
                .Argument<NonNullGraphType<InputGetCalendarEventsGraphType>>("input")
                .ResolveAsync(async (context) =>
                {
                    var request = context.GetArgument<GetCalendarEventsRequest>("input");
                    return await calendarEventsRepository.FindEventsByUserAndDateRangeAsync(request.UserId, request.From, request.To);
                });
        }
    }
}
