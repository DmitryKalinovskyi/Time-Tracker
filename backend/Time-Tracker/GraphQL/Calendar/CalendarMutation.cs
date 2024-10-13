using GraphQL;
using GraphQL.Server.Transports.AspNetCore.Errors;
using GraphQL.Types;
using GraphQL.Validation;
using Time_Tracker.GraphQL.Calendar.Dtos;
using Time_Tracker.GraphQL.Calendar.Errors;
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
                .Argument<NonNullGraphType<CreateCalendarEventInputGraphType>>("calendarEvent")
                .ResolveAsync(async (context) =>
                {
                    var createCalendarEventRequest = context.GetArgument<CreateCalendarEventRequest>("calendarEvent");

                    if(createCalendarEventRequest.StartTime > createCalendarEventRequest.EndTime)
                    {
                        throw new ValidationError("Start time should be before end time.");
                    }

                    var userId = context.User.GetUserId();
                    var calendarEvent = new CalendarEvent()
                    {
                        StartTime = createCalendarEventRequest.StartTime,
                        EndTime = createCalendarEventRequest.EndTime,
                        UserId = userId
                    };

                    var calendarEventId = await calendarEventsRepository.InsertAsync(calendarEvent);
                    return await calendarEventsRepository.FindAsync(calendarEventId) ?? throw new InvalidOperationException("Calendar event not founded.");
                });

            Field<CalendarEventGraphType>("updateCalendarEvent")
                .Authorize()
                .Argument<NonNullGraphType<UpdateCalendarEventInputGraphType>>("calendarEvent")
                .ResolveAsync(async (context) =>
                {
                    var updateCalendarEventInputType = context.GetArgument<UpdateCalendarEventRequest>("calendarEvent");

                    var calendarEvent = await calendarEventsRepository.FindAsync(updateCalendarEventInputType.Id)
                        ?? throw new CalendarEventDoesNotExistExecutionError("Calendar event does not exist.");

                    var userId = context.User.GetUserId();

                    if (updateCalendarEventInputType.StartTime > updateCalendarEventInputType.EndTime)
                    {
                        throw new ValidationError("Start time should be before end time.");
                    }

                    if (userId != calendarEvent.UserId)
                    {
                        throw new AccessDeniedError("updateCalendarEvent");
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

                    var calendarEvent = await calendarEventsRepository.FindAsync(calendarEventId)
                        ?? throw new CalendarEventDoesNotExistExecutionError("Calendar event does not exist.");

                    var userId = context.User.GetUserId();

                    if(userId != calendarEvent.UserId)
                        throw new AccessDeniedError("deleteCalendarEvent");

                    await calendarEventsRepository.DeleteAsync(calendarEventId);

                    return "Ok";
                });
        }
    }
}
