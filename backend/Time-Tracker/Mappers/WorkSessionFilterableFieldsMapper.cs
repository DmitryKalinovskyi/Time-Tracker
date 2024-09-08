using Time_Tracker.Enums;
using Time_Tracker.Helpers;

namespace Time_Tracker.Mappers
{
    public class WorkSessionFilterableFieldsMapper : IFilterableFieldsMapper<WorkSessionFilterableFields>
    {
        public string toSqlFieldName(WorkSessionFilterableFields filterableField)
        {
            return filterableField switch
            {
                WorkSessionFilterableFields.UserId => "UserId",
                WorkSessionFilterableFields.Year => "YEAR(StartTime)",
                WorkSessionFilterableFields.Month => "Month(StartTime)",
                WorkSessionFilterableFields.Week => "DATEPART(ISO_WEEK, StartTime)",
                WorkSessionFilterableFields.Day => "DAY(StartTime)",
                WorkSessionFilterableFields.SessionOriginId => "SessionOriginId",
                WorkSessionFilterableFields.EditedBy => "EditedBy",
                WorkSessionFilterableFields.Duration => "Duration",
                _ => throw new NotSupportedException($"[WORKSESSION_FILTERABLE_FIELD_MAPPER] The field {filterableField} is not supported."),
            };
        }
    }
}
