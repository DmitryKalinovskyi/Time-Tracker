using GraphQL;
using GraphQL.Types;
using Time_Tracker.GraphQL.Calendar.Dtos;
using Time_Tracker.GraphQL.Calendar.Types;
using Time_Tracker.Helpers;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Calendar
{
    public class CalendarMutation: ObjectGraphType
    {
        public CalendarMutation(ICalendarEventsRepository calendarEventsRepository)
        {
            Field<NonNullGraphType<CalendarEventGraphType>>("createCalendarEvent")
                .Authorize()
                .Argument<NonNullGraphType<CreateCalendarEventGraphType>>("calendarEvent")
                .ResolveAsync(async (context) =>
                {
                    var createCalendarEventRequest = context.GetArgument<CreateCalendarEventRequest>("calendarEvent");

                    var userId = context.User.GetUserId();
                    var calendarEvent = new CalendarEvent()
                    {
                        StartTime = createCalendarEventRequest.StartTime,
                        EndTime = createCalendarEventRequest.EndTime,
                        UserId = userId
                    };

                    var calendarEventId = await calendarEventsRepository.InsertAsync(calendarEvent);
                    return await calendarEventsRepository.FindAsync(calendarEventId) ?? throw new Exception("Calendar event not founded.");
                });

            Field<CalendarEventGraphType>("updateCalendarEvent")
                .Authorize()
                .Argument<NonNullGraphType<UpdateCalendarEventInputType>>("calendarEvent")
                .ResolveAsync(async (context) =>
                {
                    // check is belong to the user or not.
                    var updateCalendarEventInputType = context.GetArgument<UpdateCalendarEventRequest>("calendarEvent");

                    var calendarEvent = await calendarEventsRepository.FindAsync(updateCalendarEventInputType.Id) 
                        ?? throw new Exception("Calendar event not founded.");

                    var userId = context.User.GetUserId();

                    if(userId != calendarEvent.UserId)
                    {
                        // access deniend
                        return null;
                    }

                    calendarEvent.StartTime = updateCalendarEventInputType.StartTime;
                    calendarEvent.EndTime = updateCalendarEventInputType.EndTime;

                    await calendarEventsRepository.UpdateAsync(calendarEvent);

                    return calendarEvent;
                });

            Field<StringGraphType>("deleteCalendarEvent")
                .Authorize()
                .Argument<NonNullGraphType<IntGraphType>>("calendarEventId")
                .ResolveAsync(async (context) =>
                {
                    var calendarEventId = context.GetArgument<int>("calendarEventId");

                    var calendarEvent = await calendarEventsRepository.FindAsync(calendarEventId);
                    var userId = context.User.GetUserId();
                    if(calendarEvent != null && calendarEvent.UserId == userId)
                    {
                        await calendarEventsRepository.DeleteAsync(calendarEventId);
                    }

                    return "Ok";
                });
        }
    }
}
