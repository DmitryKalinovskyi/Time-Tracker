import { PaginationInfo } from "../features/timeTracking/timeTrackingSlice";
import FilterCriteria from "../types/FilterCriteria";
import PaginatedRequest from "../types/PaginatedRequest";
import { SortCriteria } from "../types/SortCriteria";

export const getCurrentPagArgs = (
    paginationInfo: PaginationInfo,
    sorts: SortCriteria[],
    filters: FilterCriteria[]
) => {
    const PaginationArgs: PaginatedRequest = {
      pageNumber: paginationInfo!.currentPage,
      pageSize: paginationInfo!.pageSize,
      sortCriterias: sorts,
      filterCriterias: filters
    };

    return PaginationArgs;
  }