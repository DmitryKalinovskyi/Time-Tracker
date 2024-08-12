using GraphQL;
using GraphQL.Types;
using Time_Tracker.Enums;
using Time_Tracker.GraphQL.TimeTracking.Types;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.TimeTracking.Mutations
{
    public class TimeTrackerMutation : ObjectGraphType
    {
        public TimeTrackerMutation(IWorkSessionRepository workSessionRepository,
                                   IUsersRepository userRepository)
        {
            Field<StartSessionResponseGraphType>("startSession")
                .Argument<NonNullGraphType<IntGraphType>>("userId")
                .ResolveAsync(async context =>
                {
                    var userId = context.GetArgument<int>("userId");

                    if (await userRepository.FindAsync(userId) is null)
                    {
                        context.Errors.Add(new ExecutionError($"User with id = {userId} does not exist."));
                        return null;
                    }

                    var newWorkSession = new WorkSession()
                    {
                        UserId = userId,
                        StartTime = null,
                        EndTime = null,
                        SessionOriginId = (int)WorkSessionOrigins.Manual,
                        EditedBy = null,
                    };

                    var workSessionInsertResult = await workSessionRepository.AddWorkSessionAsync(newWorkSession);

                    return workSessionInsertResult;
                });

            Field<WorkSessionGraphType>("stopSession")
                .Argument<NonNullGraphType<IntGraphType>>("workSessionId")
                .ResolveAsync(async context =>
                {
                    var workSessionId = context.GetArgument<int>("workSessionId");

                    var currentWorkSession = await workSessionRepository.GetWorkSessionByIdAsync(workSessionId);

                    if (currentWorkSession is null)
                    {
                        context.Errors.Add(new ExecutionError($"Works session with id = {workSessionId} does not exist."));
                        return null;
                    }  
                    else if(currentWorkSession.EndTime is not null)
                    {
                        context.Errors.Add(new ExecutionError($"Works session with id = {workSessionId} alredy stopped."));
                        return null;
                    }

                    var updatedWorkSession = await workSessionRepository.UpdateWorkSessionAsync(currentWorkSession);

                    return updatedWorkSession;
                });
        }
    }
}
