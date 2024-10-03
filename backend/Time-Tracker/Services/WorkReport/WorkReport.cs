using Microsoft.Identity.Client;
using Time_Tracker.Models;

namespace Time_Tracker.Services.WorkReport
{
    public class WorkReport
    {
        // probably some accumulated values, best worker for example
        
        public int PageCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }

        public List<UserReport> Users { get; set; } = [];
    }
}
