namespace Time_Tracker.Services
{
    public static class Permissions
    {
        public const string MANAGE_USERS = "MANAGE_USERS";
        public const string READ_TEST_QUERY = "READ_TEST_QUERY";
        public const string MANAGE_ROLES = "MANAGE_ROLES";

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
