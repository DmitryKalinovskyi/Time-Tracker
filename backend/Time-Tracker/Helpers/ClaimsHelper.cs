using System.Security.Claims;
using Time_Tracker.Models;

namespace Time_Tracker.Helpers
{
    public static class ClaimsHelper
    {
        public static int? GetUserId(this ClaimsPrincipal claimsPrincipal)
        {
            if(int.TryParse(claimsPrincipal.Claims.First().Value, out int userId))
                return userId;

            return null;
        }
    }
}
