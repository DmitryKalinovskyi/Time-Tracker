using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IWorkSessionsRepository
    {
        Task<int> AddWorkSessionAsync(WorkSession workSession);

        Task UpdateWorkSessionAsync(WorkSession workSession);

        Task DeleteWorkSessionAsync(int id);

        Task<WorkSession> GetWorkSessionByIdAsync(int id);

        Task<List<WorkSession>> GetWorkSessionsWithSortingAsync(int? first, int? last, int? before, int? after);


    }
}
