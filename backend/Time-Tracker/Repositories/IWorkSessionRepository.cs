using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IWorkSessionRepository
    {
        public class WorkSessionInsertResult
        {
            public int Id { get; set; }
            public DateTime StartTime { get; set; }
            public DateTime EndTime { get; set; }
        }

        Task<WorkSessionInsertResult> AddWorkSessionAsync(WorkSession workSession);

        Task UpdateWorkSessionAsync(WorkSession workSession);

        Task DeleteWorkSessionAsync(int id);

        Task<WorkSession?> GetWorkSessionByIdAsync(int id);

        Task<List<WorkSession>> GetWorkSessionsWithSortingAsync(int? first, int? last, int? before, int? after);


    }
}
