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
                                   IUsersRepository userRepository,
                                   ISessionOriginRepository sessionOriginRepository)
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
                    
                    if(currentWorkSession.EndTime is not null)
                    {
                        context.Errors.Add(new ExecutionError($"Works session with id = {workSessionId} alredy stopped."));
                        return null;
                    }

                    var updatedWorkSession = await workSessionRepository.UpdateWorkSessionAsync(currentWorkSession);

                    return updatedWorkSession;
                });

            Field<WorkSessionGraphType>("addSession")
                .Argument<NonNullGraphType<AddSessionInputGraphType>>("input")
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSession>("input");

                    if(await userRepository.FindAsync(inputSession.UserId) is null)
                    {
                        context.Errors.Add(new ExecutionError($"User with id = {inputSession.UserId} does not exist."));
                        return null;
                    }
                    else if(!await workSessionRepository.IsWorkSessionTimeAvailable(inputSession))
                    {
                        context.Errors.Add(new ExecutionError("Work session time overlaps with an existing one"));
                        return null;
                    }

                    if(inputSession.StartTime.Value.Kind != DateTimeKind.Utc ||
                       inputSession.EndTime.Value.Kind != DateTimeKind.Utc)
                    {
                        context.Errors.Add(new ExecutionError("StartTime and EndTime have to be in UTC time format."));
                        return null;
                    }

                    if(await sessionOriginRepository.GetSessionOriginByIdAsync(inputSession.SessionOriginId) is null)
                    {
                        context.Errors.Add(new ExecutionError($"Invalid Session Origin id = {inputSession.SessionOriginId}"));
                        return null;
                    }

                    if (inputSession.EditedBy is not null && await userRepository.FindAsync((int)inputSession.EditedBy) is null)
                    {
                        context.Errors.Add(new ExecutionError($"[Edited By] User with id = {inputSession.EditedBy} does not exist."));
                        return null;
                    }

                    var newWorkSession = await workSessionRepository.AddWorkSessionAsync(inputSession);

                    return newWorkSession;
                });

            Field<WorkSessionGraphType>("updateSession")
                .Argument<NonNullGraphType<IntGraphType>>("editorId")
                .Argument<NonNullGraphType<UpdateSessionInputGraphType>>("input")
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSession>("input");
                    var editorId = context.GetArgument<int>("editorId");
                    var currentWorkSession = await workSessionRepository.GetWorkSessionByIdAsync(inputSession.Id);
                    
                    if (currentWorkSession is null)
                    {
                        context.Errors.Add(new ExecutionError($"Work session with id = {inputSession.Id} does not exist."));
                        return null;
                    }
                    else if (!await workSessionRepository.IsWorkSessionTimeAvailable(inputSession))
                    {
                        context.Errors.Add(new ExecutionError("Work session time overlaps with an existing one"));
                        return null;
                    }

                    if (await userRepository.FindAsync(editorId) is null)
                    {
                        context.Errors.Add(new ExecutionError($"Editor with id = {editorId} does not exist."));
                        return null;
                    }

                    currentWorkSession.SessionOriginId = (int)WorkSessionOrigins.Edited;
                    currentWorkSession.EditedBy = editorId;
                    currentWorkSession.StartTime = inputSession.StartTime;
                    currentWorkSession.EndTime = inputSession.EndTime;

                    var updatedWorkSession = await workSessionRepository.UpdateWorkSessionAsync(currentWorkSession);

                    return updatedWorkSession;
                });

            Field<StringGraphType>("deleteSession")
                .Argument<IntGraphType>("workSessionId")
                .ResolveAsync(async context =>
                {
                    int workSessionId = context.GetArgument<int>("workSessionId");

                    if(await workSessionRepository.GetWorkSessionByIdAsync(workSessionId) is null)
                    {
                        context.Errors.Add(new ExecutionError($"Work session with id = {workSessionId} does not exist."));
                        return null;
                    }

                    await workSessionRepository.DeleteWorkSessionAsync(workSessionId);

                    return $"Work session with id = {workSessionId} has been successfully deleted.";

                }); 
        }
    }
}
