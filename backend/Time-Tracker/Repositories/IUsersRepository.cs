using Microsoft.Identity.Client;
using Time_Tracker.Enums;
using Time_Tracker.Helpers;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IUsersRepository
    {
        Task<PaginationResult<User>> GetUsersWithPaginationAsync(PaginationRequest<UserSortableFields> request);

        public Task<IDictionary<int, User>> GetUsersByIdAsync(IEnumerable<int> userIds);
        public Task<User?> FindAsync(int id);    

        public Task<User?> FindByEmailAsync(string email);

        Task<int> AddAsync(User user);
        Task UpdateAsync(User user);
    }
}
