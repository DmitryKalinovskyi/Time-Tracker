using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.Calendar.Types
{
    public class CalendarEventGraphType: ObjectGraphType<CalendarEvent>
    {
        public CalendarEventGraphType(IUsersRepository usersRepository)
        {
            Field(x => x.Id);
            Field(x => x.UserId);
            Field(x => x.StartTime);
            Field(x => x.EndTime);

            Field<UserGraphType>("user")
                .ResolveAsync(async context => await usersRepository.FindAsync(context.Source.UserId));
        }
    }
}
