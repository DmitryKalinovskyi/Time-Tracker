using GraphQL;
using GraphQL.Server.Transports.AspNetCore.Errors;
using GraphQL.Types;
using Time_Tracker.Authorization;
using Time_Tracker.Enums;
using Time_Tracker.GraphQL.Authorization;
using Time_Tracker.GraphQL.TimeTracking.Errors;
using Time_Tracker.GraphQL.TimeTracking.Types;
using Time_Tracker.Helpers;
using Time_Tracker.Models;
using Time_Tracker.Repositories;

namespace Time_Tracker.GraphQL.TimeTracking.Mutations
{
    public class TimeTrackerMutation : ObjectGraphType
    {
        public TimeTrackerMutation(IWorkSessionRepository workSessionRepository,
                                   IUsersRepository userRepository,
                                   ISessionOriginRepository sessionOriginRepository,
                                   IPermissionsService permissionsService)
        {
            Field<StartSessionResponseGraphType>("startSession")
                .RequirePermission(Permissions.TimeTracking)
                .ResolveAsync(async context =>
                {
                    var userId = context.User.GetUserId();

                    if (await userRepository.FindAsync(userId) is null)
                    {
                        throw new InvalidOperationException($"User with id = {userId} not founded.");
                    }

                    if(await workSessionRepository.GetCurrentWorkSessionByUserIdAsync(userId) is not null)
                    {
                        throw new SessionAlreadyStartedExecutionError($"User with id = {userId} has already started work session.");
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
                .Authorize()
                .ResolveAsync(async context =>
                {
                    var userId = context.User.GetUserId();

                    var currentWorkSession = await workSessionRepository.GetCurrentWorkSessionByUserIdAsync(userId);

                    if (currentWorkSession is null)
                    {
                        return null;
                    }  

                    var updatedWorkSession = await workSessionRepository.UpdateWorkSessionAsync(currentWorkSession);

                    return updatedWorkSession;
                });

            Field<WorkSessionGraphType>("addSession")
                .Argument<NonNullGraphType<AddSessionInputGraphType>>("input")
                .Authorize()
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
                .Argument<NonNullGraphType<UpdateSessionInputGraphType>>("input")
                .Authorize()
                .ResolveAsync(async context =>
                {
                    var inputSession = context.GetArgument<WorkSession>("input");
                    var editorId = context.User.GetUserId();
                    var currentWorkSession = await workSessionRepository.GetWorkSessionByIdAsync(inputSession.Id);

                    if (await userRepository.FindAsync(editorId) is null)
                    {
                        throw new InvalidOperationException($"User with id = {editorId} not founded.");
                    }

                    if (currentWorkSession is null)
                    {
                        context.Errors.Add(new ExecutionError($"Work session with id = {inputSession.Id} does not exist."));
                        return null;
                    }
                    else inputSession.UserId = currentWorkSession.UserId;

                    // restrict access
                    if (inputSession.UserId != editorId &&
                    !await permissionsService.HasRequiredPermission(editorId, Permissions.ManageUsersSessions))
                    {
                        throw new AccessDeniedError("updateSession");
                    }

                    if (!await workSessionRepository.IsWorkSessionTimeAvailable(inputSession))
                    {
                        context.Errors.Add(new ExecutionError("Work session time overlaps with an existing one"));
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
                .Authorize()
                .ResolveAsync(async context =>
                {
                    int workSessionId = context.GetArgument<int>("workSessionId");

                    var workSession = await workSessionRepository.GetWorkSessionByIdAsync(workSessionId);
                    if (workSession is null)
                    {
                        context.Errors.Add(new ExecutionError($"Work session with id = {workSessionId} does not exist."));
                        return null;
                    }

                    // restrict access
                    var userId = context.User.GetUserId();
                    if(workSession.UserId != userId &&
                    !await permissionsService.HasRequiredPermission(userId, Permissions.ManageUsersSessions)){
                        throw new AccessDeniedError("deleteSession");
                    }

                    await workSessionRepository.DeleteWorkSessionAsync(workSessionId);
                    return $"Work session with id = {workSessionId} has been successfully deleted.";
                });
        }
    }
}
