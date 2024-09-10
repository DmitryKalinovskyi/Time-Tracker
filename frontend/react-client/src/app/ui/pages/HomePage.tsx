import Timer from "../components/timeTracking/Timer.tsx";
import SessionList from "../components/timeTracking/SessionList.tsx";
import { Box } from "@mui/material";
import StyledButton from "../components/timeTracking/StyledButton.tsx";
import { useState } from "react";
import FilterCriteria from "../../types/FilterCriteria.ts";
import { WorkSessionFilters } from "../../enums/WorkSessionFilters.ts";
import { SQLOperators } from "../../enums/SQLOperators.ts";
import FiltersPickerModal from "../components/timeTracking/FiltersPickerModal.tsx";
import { SortCriteria } from "../../types/SortCriteria.ts";
import { WorkSessionSorts } from "../../enums/WorkSessionSorts.ts";
import SortsPickerModal from "../components/timeTracking/SortsPickerModal.tsx";
import { useDispatch } from "react-redux";
import { setFilters, setSorts } from "../../features/timeTracking/timeTrackingSlice.ts";

export default function HomePage() {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const dispatch = useDispatch();
  
  // Handlers to open/close the filter modal
  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  // Handlers to open/close the sort modal
  const handleOpenSortModal = () => {
    setSortModalOpen(true);
  };

  const handleCloseSortModal = () => {
    setSortModalOpen(false);
  };

  // Handle the filters when the modal "Apply" button is clicked
  const handleApplyFilters = (filters: FilterCriteria<WorkSessionFilters, SQLOperators>[]) => {
    dispatch(setFilters(filters));
    handleCloseFilterModal(); // Close the filter modal after applying the filters
  };

  const handleApplySorts = (sorts: SortCriteria<WorkSessionSorts>[]) => {
    dispatch(setSorts(sorts));
    handleCloseSortModal(); // Close the sort modal after applying the sorts
  };

  return (
    <>
      <Timer />
      <Box display={'flex'} justifyContent={'flex-end'} px={2} mt={2} gap={2} >
        <StyledButton label="Filtering" onClickHandler={handleOpenFilterModal} />
        <StyledButton label="Sorting" onClickHandler={handleOpenSortModal} />
      </Box>
      <Box height={'60%'}>
        <SessionList />
      </Box>
      
      {/* Modal for picking filters */}
      <FiltersPickerModal<WorkSessionFilters>
        open={isFilterModalOpen}
        filtersEnum={Object.values(WorkSessionFilters)} // Pass the user filters enum
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
      />

      {/* Modal for picking sorts */}
      <SortsPickerModal<WorkSessionSorts>
        open={isSortModalOpen}
        sortsEnum={Object.values(WorkSessionSorts)}
        onClose={handleCloseSortModal}
        onApplySorts={handleApplySorts}
      />
    </>
  );
};
