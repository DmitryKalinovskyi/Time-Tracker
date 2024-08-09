using Microsoft.AspNetCore.Authorization;
using Time_Tracker.Helpers;

namespace Time_Tracker.Authorization
{
    public class PermissionHandler(IPermissionsService permissionsService) : AuthorizationHandler<PermissionRequirement>
    {
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            int? userId = context.User.GetUserId();
            if(userId == null || !await permissionsService.HasRequiredPermission((int)userId, requirement.Permission))
            {
                context.Fail();
                return;
            }

            context.Succeed(requirement);
        }
    }
}
