using Microsoft.AspNetCore.Authorization;
using Time_Tracker.Helpers;

namespace Time_Tracker.Authorization
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public string Permission { get; set; }

        public PermissionRequirement(string permission) 
        {
            Permission = permission;
        }
    }
}
