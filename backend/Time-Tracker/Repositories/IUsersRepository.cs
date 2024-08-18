using Microsoft.Identity.Client;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IUsersRepository
    {
        public Task<(IEnumerable<User>, bool HasNextPage, bool HasPrevPage, int? totalNumber)> GetUsersAsync(int? first, int? afterId, int? last, int? beforeId);

        public Task<IDictionary<int, User>> GetUsersByIdAsync(IEnumerable<int> userIds);
        public Task<User?> FindAsync(int id);    

        public Task<User?> FindByEmailAsync(string email);

        Task<int> AddAsync(User user);
        Task UpdateAsync(User user);
    }
}
