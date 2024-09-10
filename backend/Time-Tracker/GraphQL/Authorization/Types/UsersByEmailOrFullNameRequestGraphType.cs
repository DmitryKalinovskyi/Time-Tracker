using GraphQL.Types;
using Time_Tracker.Dtos;

namespace Time_Tracker.GraphQL.Authorization.Types
{
    public class UsersByEmailOrFullNameRequestGraphType: InputObjectGraphType<UsersByEmailOrFullNameRequest>
    {
        public UsersByEmailOrFullNameRequestGraphType()
        {
            Field(x => x.EmailOrFullName);
            Field(x => x.UsersLimit);
        }
    }
}
