using GraphQL.Types;
using Time_Tracker.GraphQL.Calendar.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Authorization.Types;

public class UserGraphType : ObjectGraphType<User>
{
    public UserGraphType(ICalendarEventsRepository calendarEventsRepository)
    {
        Field(t => t.Id);
        Field(t => t.FullName);
        Field(t => t.Email);
        Field(t => t.Permissions, nullable: true);
        Field(t => t.IsActive);
        Field(t => t.Position);
        Field(t => t.WorkHoursPerMonth);

        Field<NonNullGraphType<ListGraphType<NonNullGraphType<CalendarEventGraphType>>>>("calendarEvents")
            .ResolveAsync(async context => await calendarEventsRepository.FindAllByUserIdAsync(context.Source.Id));
    }
}
