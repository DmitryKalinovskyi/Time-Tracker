import FilterCriteria from "./FilterCriteria"
import { SortCriteria } from "./SortCriteria"

export default interface PaginatedRequest<TSortFields, TFilterFields, TOperators>
{
    pageNumber: number
    pageSize?: number
    sortCriterias?: Array<SortCriteria<TSortFields>>
    filterCriterias?: Array<FilterCriteria<TFilterFields, TOperators>>
}