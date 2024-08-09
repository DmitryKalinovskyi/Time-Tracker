using GraphQL.Types;
using Time_Tracker.Authorization;

namespace Time_Tracker.GraphQL.Authorization.Queries
{
    public class PermissionsQuery : ObjectGraphType
    {
        public PermissionsQuery()
        {
            Field<NonNullGraphType<ListGraphType<StringGraphType>>>("availablePermissions")
                .Resolve(context => Permissions.GetAllPermissions());
        }
    }
}
