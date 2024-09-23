import Timer from "../components/timeTracking/Timer.tsx";
import SessionList from "../components/timeTracking/SessionList.tsx";
import { Box } from "@mui/material";
import StyledButton from "../components/timeTracking/StyledButton.tsx";
import { useState } from "react";
import FilterCriteria from "../../types/FilterCriteria.ts";
import FiltersModal from "../components/timeTracking/FiltersModal.tsx";
import { SortCriteria } from "../../types/SortCriteria.ts";
import SortsModal from "../components/timeTracking/SortsModal.tsx";
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
  const handleApplyFilters = (filters: FilterCriteria[]) => {

    console.log(filters);
    dispatch(setFilters(filters));
    handleCloseFilterModal();
  };

  const handleApplySorts = (sorts: SortCriteria[]) => {
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
      <FiltersModal
        open={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
      />

      {/* Modal for picking sorts */}
      <SortsModal
        open={isSortModalOpen}
        onClose={handleCloseSortModal}
        onApplySorts={handleApplySorts}
      />
    </>
  );
};
