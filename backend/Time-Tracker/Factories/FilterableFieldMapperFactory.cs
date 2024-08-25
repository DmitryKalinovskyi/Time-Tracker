using Time_Tracker.Enums;
using Time_Tracker.Helpers;

namespace Time_Tracker.Factories
{
    public static class FilterableFieldMapperFactory
    {
        public static IFilterableFieldMapper<TFilterableFields> GetMapper<TFilterableFields>()
            where TFilterableFields : Enum
        {
            if(typeof(TFilterableFields) == typeof(UserFilterableFields))
            {
                return (IFilterableFieldMapper<TFilterableFields>)new UserFilterableFieldMapper();
            }
            else if(typeof(TFilterableFields) == typeof(WorkSessionFilterableFields))
            {
                return (IFilterableFieldMapper<TFilterableFields>)new WorkSessionFilterableFieldMapper();
            }
            else
            {
                throw new NotSupportedException($"No mapper available for field type {typeof(TFilterableFields).Name}");
            }
        }
    }
}
