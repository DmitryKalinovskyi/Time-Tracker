﻿
using System.Security;
using Time_Tracker.Repositories;

namespace Time_Tracker.Services
{
    public class PermissionsService(IUsersRepository usersRepository, IRolesRepository rolesRepository) : IPermissionsService
    {
        public bool HasRequiredPermission(int userId, string permission)
        {
            var user = usersRepository.Find(userId);
            if (user == null || user.RoleId == null) return false;

            var role = rolesRepository.Find((int)user.RoleId);
            if(role == null) return false;
            return role.PermissionList.Contains(permission);
        }

        public bool HasRequiredPermissions(int userId, List<string> permissions)
        {
            var user = usersRepository.Find(userId);
            if (user == null || user.RoleId == null) return false;

            var role = rolesRepository.Find((int)user.RoleId);
            if (role == null) return false;

            foreach(var permission in permissions)
                if(!role.PermissionList.Contains(permission)) return false;

            return true;
        }
    }
}
