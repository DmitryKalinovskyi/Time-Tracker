using Microsoft.Identity.Client;
using Time_Tracker.Enums;
using Time_Tracker.Helpers;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IUsersRepository
    {
        Task<PaginationResult<User>> GetUsersWithPaginationAsync(PaginationRequest<UserSortableFields, UserFilterableFields, SQLOperators> request);

        public Task<IDictionary<int, User>> GetUsersByIdAsync(IEnumerable<int> userIds);
        public Task<User?> FindAsync(int id);    

        public Task<User?> FindByEmailAsync(string email);

        public Task<List<User>> SearchByEmailOrFullname(string emailOrFullName, int limit);

        Task<int> AddAsync(User user);
        Task UpdateAsync(User user);
    }
}
