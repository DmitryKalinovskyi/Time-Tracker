using GraphQL;
using GraphQL.Validation;
using Microsoft.AspNetCore.Authorization;
using Time_Tracker.Services;
using Time_Tracker.Helpers;

namespace Time_Tracker.GraphQL.ValidationRules
{
    public partial class PermissionAuthorizationRule : IValidationRule
    {
        private readonly IPermissionsService _permissionsService;

        private readonly bool _exposeRequiredPermissions;

        public PermissionAuthorizationRule(IConfiguration configuration, IPermissionsService permissionsService)
        {
            _permissionsService = permissionsService;
            if(!bool.TryParse(configuration["Authorization:ExposeRequiredPermissions"], out _exposeRequiredPermissions))
                throw new InvalidOperationException("Invalid configuration for 'Authorization:ExposeRequiredPermissions'. It should be a boolean value.");
        }

        public async ValueTask<INodeVisitor?> ValidateAsync(ValidationContext context)
        {
            var user = context.User
            ?? throw new InvalidOperationException("User could not be retrieved from ValidationContext. Please be sure it is set in ExecutionOptions.User.");
            var provider = context.RequestServices
                ?? throw new MissingRequestServicesException();
            var authService = provider.GetService<IAuthorizationService>()
                ?? throw new InvalidOperationException("An instance of IAuthorizationService could not be pulled from the dependency injection framework.");

            var authenticated = context.User?.Identity?.IsAuthenticated ?? false;
            var userId = context.User?.GetUserId() ?? null;
            var userPermissions = userId != null ? _permissionsService.GetPermissions((int)userId) : [];

            return new PermissionAuthorizationVisitor(authenticated, userId, userPermissions, _exposeRequiredPermissions);
        }
    }
}
