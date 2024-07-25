using Time_Tracker.Models;

namespace Time_Tracker.Repositories
{
    public interface IUsersRepository
    {
        public User? Find(int id);    

        public User? FindByEmail(string email); 
    }
}
