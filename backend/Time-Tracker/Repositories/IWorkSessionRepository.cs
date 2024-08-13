using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IWorkSessionRepository
    {

        Task<WorkSession> AddWorkSessionAsync(WorkSession workSession);

        Task<WorkSession> UpdateWorkSessionAsync(WorkSession workSession);

        Task DeleteWorkSessionAsync(int id);

        Task<WorkSession?> GetWorkSessionByIdAsync(int id);

        Task<(IEnumerable<WorkSession>, bool HasNextPage, bool HasPrevPage)> GetWorkSessionsWithPagination(int? first, int? last, int? beforeId, int? afterId);


    }
}
