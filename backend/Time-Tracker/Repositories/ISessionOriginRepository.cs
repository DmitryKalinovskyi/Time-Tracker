using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface ISessionOriginRepository
    {
        Task<SessionOrigin?> GetSessionOriginByIdAsync(int id);

        public Task<IDictionary<int, SessionOrigin>> GetSessionOriginsByIdAsync(IEnumerable<int> originsIds);
    }
}
