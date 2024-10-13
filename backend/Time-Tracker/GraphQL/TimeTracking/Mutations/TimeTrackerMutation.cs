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
                    // restrict access
                    var inputSession = context.GetArgument<WorkSession>("input");
                    var creatorId = context.User.GetUserId();

                    var hasAccess = creatorId == inputSession.UserId ||
                        await permissionsService.HasPermission(creatorId, Permissions.ManageUsersSessions);

                    if (!hasAccess) {
                        throw new AccessDeniedError("addSession");
                    }

                    if(await userRepository.FindAsync(inputSession.UserId) is null)
                    {
                        throw new UserDoesNotExistExecutionError($"User with id = {inputSession.UserId} does not exist.");
                    }

                    if(!await workSessionRepository.IsWorkSessionTimeAvailable(inputSession))
                    {
                        throw new WorkSessionsOverlapsExecutionError("Work session time overlaps with an existing one");
                    }

                    if(creatorId == inputSession.UserId)
                    {
                        inputSession.SessionOriginId = (int)WorkSessionOrigins.Manual;
                    }
                    else
                    {
                        inputSession.SessionOriginId = (int)WorkSessionOrigins.Edited;
                        inputSession.EditedBy = creatorId;
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
                    var currentWorkSession = await workSessionRepository.GetWorkSessionByIdAsync(inputSession.Id)
                    ?? throw new WorkSessionDoesNotExistExecutionError($"Work session with id = {inputSession.Id} does not exist.");

                    if (await userRepository.FindAsync(editorId) is null)
                    {
                        throw new InvalidOperationException($"User with id = {editorId} not founded.");
                    }

                    inputSession.UserId = currentWorkSession.UserId;

                    // restrict access
                    if (inputSession.UserId != editorId &&
                    !await permissionsService.HasPermission(editorId, Permissions.ManageUsersSessions))
                    {
                        throw new AccessDeniedError("updateSession");
                    }

                    if (!await workSessionRepository.IsWorkSessionTimeAvailable(inputSession))
                    {
                        throw new WorkSessionsOverlapsExecutionError("Work session time overlaps with an existing one");
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

                    var workSession = await workSessionRepository.GetWorkSessionByIdAsync(workSessionId)
                    ?? throw new WorkSessionDoesNotExistExecutionError($"Work session with id = {workSessionId} does not exist.");

                    // restrict access
                    var userId = context.User.GetUserId();
                    if(workSession.UserId != userId &&
                    !await permissionsService.HasPermission(userId, Permissions.ManageUsersSessions)){
                        throw new AccessDeniedError("deleteSession");
                    }

                    await workSessionRepository.DeleteWorkSessionAsync(workSessionId);
                    return $"Work session with id = {workSessionId} has been successfully deleted.";
                });
        }
    }
}
