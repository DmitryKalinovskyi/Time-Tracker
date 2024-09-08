using Time_Tracker.Enums;
using Time_Tracker.Helpers;
using Time_Tracker.Mappers;

namespace Time_Tracker.Factories
{
    public static class FilterableFieldMapperFactory
    {
        public static IFilterableFieldsMapper<TFilterableFields> GetMapper<TFilterableFields>()
            where TFilterableFields : Enum
        {
            if(typeof(TFilterableFields) == typeof(UserFilterableFields))
            {
                return (IFilterableFieldsMapper<TFilterableFields>)new UserFilterableFieldsMapper();
            }
            else if(typeof(TFilterableFields) == typeof(WorkSessionFilterableFields))
            {
                return (IFilterableFieldsMapper<TFilterableFields>)new WorkSessionFilterableFieldsMapper();
            }
            else
            {
                throw new NotSupportedException($"No mapper available for field type {typeof(TFilterableFields).Name}");
            }
        }
    }
}
