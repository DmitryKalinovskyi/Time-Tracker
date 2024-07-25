using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IRolesRepository
    {
        public Role? Find(int roleId);
    }
}
