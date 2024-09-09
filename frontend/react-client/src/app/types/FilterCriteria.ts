export default interface FilterCriteria<TFilterFields, TOperators>
{
    filterBy: TFilterFields
    operator: TOperators
    value: string
}