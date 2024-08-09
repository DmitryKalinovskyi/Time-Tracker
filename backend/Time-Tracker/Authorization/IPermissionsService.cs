namespace Time_Tracker.Authorization
{
    public interface IPermissionsService
    {
        public Task<bool> HasRequiredPermissions(int userId, List<string> permissions);

        public Task<bool> HasRequiredPermission(int userId, string permissions);

        public Task<List<string>> GetPermissions(int userId);
    }
}
