using Time_Tracker.Helpers;

namespace Time_Tracker.Enums
{
    public enum UserFilterableFields
    {
        isActive,
        Permissions,
        Email,
        FullName
    }

    public class UserFilterableFieldMapper : IFilterableFieldMapper<UserFilterableFields>
    {
        public string toSqlFieldName(UserFilterableFields filterableField)
        {
            return filterableField switch
            {
                UserFilterableFields.isActive => "isActive",
                UserFilterableFields.Permissions => "Permissions",
                UserFilterableFields.Email => "Email",
                UserFilterableFields.FullName => "FullName",
                _ => throw new NotSupportedException($"[USER_FILTERABLE_FIELD_MAPPER] The field {filterableField} is not supported."),
            };
        }
    }
}
