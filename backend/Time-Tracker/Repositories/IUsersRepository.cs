using Microsoft.Identity.Client;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IUsersRepository
    {
        public Task<List<User>> GetUsersAsync(int? first, int? afterId, int? last, int? beforeId);

        public Task<IDictionary<int?, User>> GetUsersByIdAsync(List<int?> userIds);
        public Task<int> GetTotalUsersCount();
        public Task<User?> FindAsync(int id);    

        public Task<User?> FindByEmailAsync(string email);

        Task<int> AddAsync(User user);
        Task UpdateAsync(User user);
    }
}
