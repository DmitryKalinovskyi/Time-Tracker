using GraphQL;
using GraphQL.Builders;
using GraphQL.Types;

namespace Time_Tracker.GraphQL.Authorization
{
    public static class GraphQLExtensions
    {
        //public static readonly string PermissionsKey = "Permissions";

        //public static bool CanAccess(this IProvideMetadata type, List<string> userPermissions)
        //{
        //    var permissions = type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>());
        //    return permissions.All(userPermissions.Contains);
        //}

        //public static List<string> GetRequiredPermissions(this IProvideMetadata type, List<string> userPermissions)
        //{
        //    var permissions = type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>());
        //    return permissions.Where(permission => !userPermissions.Contains(permission)).ToList();
        //}

        //public static List<string> GetPermissions(this IProvideMetadata type)
        //{
        //    return type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>()).ToList();
        //}

        //public static bool RequiresPermissions(this IProvideMetadata type)
        //{
        //    var permissions = type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>());
        //    return permissions.Any();
        //}

        //public static bool HasPermission(this IProvideMetadata type, string permission)
        //{
        //    var permissions = type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>());
        //    return permissions.Any(x => string.Equals(x, permission));
        //}

        //public static bool HasPermissions(this IProvideMetadata type, List<string> permissions)
        //{
        //    var metadataPermissions = type.GetMetadata<IEnumerable<string>>(PermissionsKey, new List<string>());
        //    return permissions.All(permission => metadataPermissions.Contains(permission));
        //}

        //public static void RequirePermission(this IProvideMetadata type, string permission)
        //{
        //    var permissions = type.GetMetadata<List<string>>(PermissionsKey);

        //    if (permissions == null)
        //    {
        //        permissions = new List<string>();
        //        type.Metadata[PermissionsKey] = permissions;
        //    }

        //    permissions.Add(permission);
        //}

        public static FieldBuilder<TSourceType, TReturnType> RequirePermission<TSourceType, TReturnType>(
            this FieldBuilder<TSourceType, TReturnType> builder, string permission)
        {
            builder.FieldType.AuthorizeWithPolicy(permission);
            return builder;
        }

        public static FieldBuilder<TSourceType, TReturnType> RequirePermissions<TSourceType, TReturnType>(
           this FieldBuilder<TSourceType, TReturnType> builder, List<string> permissions)
        {
            foreach (var permission in permissions)
                builder.FieldType.AuthorizeWithPolicy(permission);
            return builder;
        }
    }
}
