using Microsoft.Identity.Client;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IRolesRepository
    {
        public List<Role> GetRoles();

        public Role? Find(int roleId);

        public int Insert(Role role);

        public void Update(int roleId, Role role);
        
        public void Delete(int roleId);
    }
}
