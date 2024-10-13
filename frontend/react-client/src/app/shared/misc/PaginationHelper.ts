import { PaginationInfo } from "@time-tracker/features/timeTracking/timeTrackingSlice.ts";
import FilterCriteria from "@time-tracker/types/FilterCriteria.ts";
import PaginatedRequest from "@time-tracker/types/PaginatedRequest.ts";
import { SortCriteria } from "@time-tracker/types/SortCriteria.ts";

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