namespace Time_Tracker.Authorization
{
    public interface IPermissionsService
    {
        public bool HasRequiredPermissions(int userId, List<string> permissions);

        public bool HasRequiredPermission(int userId, string permissions);

        public List<string> GetPermissions(int userId);
    }
}
