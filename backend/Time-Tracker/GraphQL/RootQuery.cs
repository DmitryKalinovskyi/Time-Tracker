using GraphQL.Types;
using Microsoft.IdentityModel.Protocols;
using Time_Tracker.GraphQL.Authorization.Mutations;
using Time_Tracker.GraphQL.Authorization.Queries;
using Time_Tracker.GraphQL.Calendar;
using Time_Tracker.GraphQL.TimeTracking.Queries;
using Time_Tracker.GraphQL.WorkReporting;

namespace Time_Tracker.GraphQL
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<PermissionsQuery>("permissionsQuery").Resolve(context => new { });
            Field<UsersQuery>("usersQuery").Resolve(context => new { });
            Field<TimeTrackerQuery>("timeTrackerQuery").Resolve(context => new { });
            Field<CalendarQuery>("calendarQuery").Resolve(context => new { });
            Field<WorkReportingQuery>("workReportingQuery").Resolve(context => new { });
        }
    }
}
