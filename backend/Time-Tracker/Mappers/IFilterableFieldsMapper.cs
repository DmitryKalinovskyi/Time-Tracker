namespace Time_Tracker.Mappers
{
    public interface IFilterableFieldsMapper<TFilterableFields>
    where TFilterableFields : Enum
    {
        string toSqlFieldName(TFilterableFields filterableField);
    }
}
