namespace Time_Tracker.Authorization
{
    public static class Permissions
    {
        public const string ManageUsers = "ManageUsers";
        public const string ManageUsersPermissions = "ManageUsersPermissions";
        public const string TimeTracking = "TimeTracking";
        public const string ManageUsersSessions = "ManageUsersSessions";

        public static List<string> GetAllPermissions()
        {
            var fields = typeof(Permissions).GetFields();
            return fields
                .Where(f => f.IsLiteral)
                .Select(f => (string?)f.GetRawConstantValue() ?? throw new InvalidOperationException($"Constant value for field {f.Name} is null."))
                .ToList();
        }

    }
}
