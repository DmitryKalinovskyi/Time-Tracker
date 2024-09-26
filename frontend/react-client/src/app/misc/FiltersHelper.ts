import FilterCriteria from "../types/FilterCriteria";

export function isTodayStartTimeFilter(filters: FilterCriteria[])
{
    const today = new Date().toISOString().split('T')[0]
    const startTimeFilterValue = filters.find((filter) => filter.filterBy === "START_TIME")?.value
    return startTimeFilterValue && startTimeFilterValue.split(',')[0] === today;
}