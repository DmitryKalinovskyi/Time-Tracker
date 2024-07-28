using GraphQL.Builders;
using GraphQL.Types;
using System.Security;

namespace Time_Tracker.GraphQL.Extensions
{
    public static class GraphQLExtensions
    {
        public static readonly string PermissionsKey = "Permissions";

        public static bool CanAccess(this IProvideMetadata type, List<string> userPermissions)
        {
            var permissions = type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>());
            return permissions.All(permission => userPermissions.Contains(permission));
        }

        public static bool RequiresPermissions(this IProvideMetadata type)
        {
            var permissions = type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>());
            return permissions.Any();
        }

        public static bool HasPermission(this IProvideMetadata type, string permission)
        {
            var permissions = type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>());
            return permissions.Any(x => string.Equals(x, permission));
        }

        public static bool HasPermissions(this IProvideMetadata type, List<string> permissions)
        {
            var metadataPermissions = type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>());
            return permissions.All(permission => metadataPermissions.Contains(permission));
        }

        public static void RequirePermission(this IProvideMetadata type, string permission)
        {
            var permissions = type.GetMetadata<List<string>>(PermissionsKey);

            if (permissions == null)
            {
                permissions = new List<string>();
                type.Metadata[PermissionsKey] = permissions;
            }

            permissions.Add(permission);
        }

        public static FieldBuilder<TSourceType, TReturnType> RequirePermission<TSourceType, TReturnType>(
            this FieldBuilder<TSourceType, TReturnType> builder, string permission)
        {
            builder.FieldType.RequirePermission(permission);
            return builder;
        }

        public static FieldBuilder<TSourceType, TReturnType> RequirePermissions<TSourceType, TReturnType>(
           this FieldBuilder<TSourceType, TReturnType> builder, List<string> permissions)
        {
            foreach (var permission in permissions)
                builder.FieldType.RequirePermission(permission);
            return builder;
        }
    }
}
