namespace Time_Tracker.Services
{
    public interface IPermissionsService
    {
        public bool HasRequiredPermissions(int userId, List<string> permissions);
        
        public bool HasRequiredPermission(int userId, string permissions);
    }
}
