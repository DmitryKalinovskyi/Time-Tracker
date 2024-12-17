import FilterCriteria from "./FilterCriteria.ts"
import { SortCriteria } from "./SortCriteria.ts"

export default interface PaginatedRequest
{
    pageNumber: number
    pageSize?: number
    sortCriterias?: Array<SortCriteria>
    filterCriterias?: Array<FilterCriteria>
}