using GraphQL;
using GraphQL.Types;
using Time_Tracker.GraphQL.Authorization.Types;
using Time_Tracker.GraphQL.TimeTracking.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.TimeTracking.Mutations
{
    public class TimeTrackerMutation : ObjectGraphType
    {
        public TimeTrackerMutation(IWorkSessionRepository workSessionRepository)
        {
            Field<StartSessionResponseGraphType>("startSession")
                .Argument<NonNullGraphType<StartSessionInputGraphType>>("input")
                .ResolveAsync(async context =>
                {
                    var sessionInput = context.GetArgument<WorkSession>("input");

                    var workSessionInsertResult = await workSessionRepository.AddWorkSessionAsync(sessionInput);

                    return workSessionInsertResult;
                });
        }
    }
}
