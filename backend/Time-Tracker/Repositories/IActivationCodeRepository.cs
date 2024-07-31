using Microsoft.Data.SqlClient;
using Time_Tracker.Models;

namespace Time_Tracker.Repositories;

public interface IActivationCodeRepository
{
    Task<ActivationCode?> Find(int id);

    Task<ActivationCode?> FindByValueAsync(Guid value);

    Task<int> AddAsync(ActivationCode code);

    Task UpdateAsync(User user);
}
