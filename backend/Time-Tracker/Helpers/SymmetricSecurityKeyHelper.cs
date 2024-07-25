using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Time_Tracker.Helpers;

public static class SymmetricSecurityKeyHelper
{
    public static SymmetricSecurityKey GetSymmetricSecurityKey(string KEY) =>
        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
}
