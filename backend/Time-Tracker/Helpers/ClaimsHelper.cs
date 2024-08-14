using System.Security.Claims;
using Time_Tracker.Models;

namespace Time_Tracker.Helpers
{
    public static class ClaimsHelper
    {
        public static int GetUserId(this ClaimsPrincipal? claimsPrincipal)
        {
            if(claimsPrincipal == null) throw new ArgumentNullException(nameof(claimsPrincipal));   

            var claim = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (claim != null && int.TryParse(claim.Value, out int userId))
                return userId;

            throw new InvalidOperationException("The required NameIdentifier claim is missing or invalid.");
        }

        public static int? TryGetUserId(this ClaimsPrincipal? claimsPrincipal)
        {
            if (claimsPrincipal == null) return null;

            var claim = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (claim != null && int.TryParse(claim.Value, out int userId))
                return userId;

            return null;
        }
    }
}
