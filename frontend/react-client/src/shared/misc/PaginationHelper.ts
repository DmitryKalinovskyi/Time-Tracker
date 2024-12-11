import { PaginationInfo } from "@time-tracker/features/timeTracking/timeTrackingSlice.ts";
import FilterCriteria from "../../types/FilterCriteria.ts";
import PaginatedRequest from "../../types/PaginatedRequest.ts";
import { SortCriteria } from "../../types/SortCriteria.ts";

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