using GraphQL.Types;
using Time_Tracker.Services;

namespace Time_Tracker.GraphQL.Queries
{
    public class PermissionsQuery: ObjectGraphType
    {
        public PermissionsQuery() 
        {
            Field<NonNullGraphType<ListGraphType<StringGraphType>>>("avaiblePermissions")
                .Resolve(context =>
                {
                    return Permissions.GetAllPermissions();
                });
        }
    }
}
