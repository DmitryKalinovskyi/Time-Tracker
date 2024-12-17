using Time_Tracker.Enums;
using Time_Tracker.GraphQL.Authorization.Enums;
using Time_Tracker.Helpers;

namespace Time_Tracker.GraphQL.Authorization.Dtos
{
    public class UsersByEmailOrFullNameRequest :
        PaginationRequest<UsersByEmailOrFullNameSortableFields, UsersByEmailOrFullNameFilterableFields, SQLOperators>
    {
        public required string EmailOrFullName { get; set; }
    }
}
