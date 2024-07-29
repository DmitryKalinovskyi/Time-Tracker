using GraphQL.Types;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Authorization.Queries
{
    public class PermissionsQuery : ObjectGraphType
    {
        public PermissionsQuery()
        {
            Field<NonNullGraphType<ListGraphType<StringGraphType>>>("avaiblePermissions")
                .Resolve(context => Permissions.GetAllPermissions());
        }
    }
}
