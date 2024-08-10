
using System.Security;
using Time_Tracker.Repositories;

namespace Time_Tracker.Authorization
{
    public class PermissionsService(IUsersRepository usersRepository) : IPermissionsService
    {
        public async Task<List<string>> GetPermissions(int userId)
        {
            var user = await usersRepository.FindAsync(userId);

            return user?.Permissions ?? [];
        }

        public async Task<bool> HasRequiredPermission(int userId, string permission)
        {
            return (await GetPermissions(userId)).Contains(permission);
        }

        public async Task<bool> HasRequiredPermissions(int userId, List<string> permissions)
        {
            var userPermissions = await GetPermissions(userId);

            foreach (var permission in permissions)
                if (!userPermissions.Contains(permission)) return false;

            return true;
        }
    }
}
