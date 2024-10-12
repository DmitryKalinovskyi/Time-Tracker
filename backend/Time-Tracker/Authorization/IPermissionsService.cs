namespace Time_Tracker.Authorization
{
    public interface IPermissionsService
    {
        [Obsolete("Use HasPermission instead.")]
        public Task<bool> HasRequiredPermissions(int userId, List<string> permissions);

        [Obsolete("Use HasPermissions instead.")]
        public Task<bool> HasRequiredPermission(int userId, string permissions);

        public Task<List<string>> GetPermissions(int userId);

        public Task<bool> HasPermission(int userId, string permission);

        public Task<bool> HasPermissions(int userId, List<string> permission);
    }
}
