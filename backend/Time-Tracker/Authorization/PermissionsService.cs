
using System.Security;
using Time_Tracker.Repositories;

namespace Time_Tracker.Authorization
{
    public class PermissionsService(IUsersRepository usersRepository) : IPermissionsService
    {
        public List<string> GetPermissions(int userId)
        {
            var user = usersRepository.Find(userId);

            return user?.Permissions ?? [];
        }

        public bool HasRequiredPermission(int userId, string permission)
        {
            return GetPermissions(userId).Contains(permission);
        }

        public bool HasRequiredPermissions(int userId, List<string> permissions)
        {
            var userPermissions = GetPermissions(userId);

            foreach (var permission in permissions)
                if (!userPermissions.Contains(permission)) return false;

            return true;
        }
    }
}
