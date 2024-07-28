using System.Security.Claims;
using Time_Tracker.Models;

namespace Time_Tracker.Helpers
{
    public static class ClaimsHelper
    {
        public static int? GetUserId(this ClaimsPrincipal? claimsPrincipal)
        {
            if (claimsPrincipal == null) return null;

            var claim = claimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (claim != null && int.TryParse(claim.Value, out int userId))
                return userId;

            return null;
        }
    }
}
