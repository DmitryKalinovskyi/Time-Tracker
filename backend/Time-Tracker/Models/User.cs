﻿namespace Time_Tracker.Models
{
    public class User
    {
        public int Id { get; set; } 

        public string FullName { get; set; }

        public string Email { get; set; }

        public string HashedPassword { get; set; }

        public string Salt { get; set; }

        public int? RoleId { get; set; } 

        public bool IsActive { get; set; } = false;
    }
}
