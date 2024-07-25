namespace Time_Tracker.Models
{
    public class Role
    {
        public int Id { get; set; } 

        public required string Name { get; set; }

        public required string Permissions { get; set; }

        public List<string> PermissionList
        {
            get
            {
                return Permissions.Split(' ').ToList();
            }

            set
            {
                Permissions = string.Join(' ', value);
            }
        }
    }
}
