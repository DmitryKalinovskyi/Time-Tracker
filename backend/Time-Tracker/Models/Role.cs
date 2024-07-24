﻿namespace Time_Tracker.Models
{
    public class Role
    {
        public int Id { get; set; } 

        public required string Name { get; set; }

        public required List<string> Permissions { get; set; }
    }
}
