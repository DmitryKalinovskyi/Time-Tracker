using Microsoft.Identity.Client;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IUsersRepository
    {
        public Task<List<User>> GetUsersAsync(int? first, int? afterId);
        public Task<int> GetTotalUsersCount();
        public User? Find(int id);    

        public User? FindByEmail(string email);

        Task<int> AddAsync(User user);
        Task UpdateAsync(User user);
    }
}
