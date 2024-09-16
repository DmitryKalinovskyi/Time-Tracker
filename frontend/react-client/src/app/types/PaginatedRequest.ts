import FilterCriteria from "./FilterCriteria"
import { SortCriteria } from "./SortCriteria"

export default interface PaginatedRequest
{
    pageNumber: number
    pageSize?: number
    sortCriterias?: Array<SortCriteria>
    filterCriterias?: Array<FilterCriteria>
}