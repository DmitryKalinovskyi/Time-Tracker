import Timer from "../components/timeTracking/Timer.tsx";
import { Box } from "@mui/material";
import {SessionTable} from "../components/timeTracking/SessionTable.tsx";
import useIsHavePermission from "../../hooks/useIsHavePermission.ts";
import {TimeTrackingPermission} from "../../features/permissions/permissions.ts";
import {useTimer} from "../components/timeTracking/hooks/useTimer.ts";

export default function HomePage() {
    const isHaveTimeTrackingPermission = useIsHavePermission(TimeTrackingPermission)
    const {isTracking} = useTimer();
  // const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  // const [isSortModalOpen, setSortModalOpen] = useState(false);
  // const dispatch = useDispatch();
  //
  // // Handlers to open/close the filter modal
  // const handleOpenFilterModal = () => {
  //   setFilterModalOpen(true);
  // };
  //
  // const handleCloseFilterModal = () => {
  //   setFilterModalOpen(false);
  // };
  //
  // // Handlers to open/close the sort modal
  // const handleOpenSortModal = () => {
  //   setSortModalOpen(true);
  // };
  //
  // const handleCloseSortModal = () => {
  //   setSortModalOpen(false);
  // };
  //
  // // Handle the filters when the modal "Apply" button is clicked
  // const handleApplyFilters = (filters: FilterCriteria[]) => {
  //   dispatch(setFilters(filters));
  //   handleCloseFilterModal();
  // };
  //
  // const handleApplySorts = (sorts: SortCriteria[]) => {
  //   dispatch(setSorts(sorts));
  //   handleCloseSortModal(); // Close the sort modal after applying the sorts
  // };

  return (
    <>
        {(isTracking || isHaveTimeTrackingPermission) && <Timer />}
      {/*<Box display={'flex'} justifyContent={'flex-end'} px={2} mt={2} gap={2} >*/}
      {/*  <StyledButton label="Filtering" onClickHandler={handleOpenFilterModal} />*/}
      {/*  <StyledButton label="Sorting" onClickHandler={handleOpenSortModal} />*/}
      {/*</Box>*/}
      <Box height={'60%'}>
        <SessionTable />
      </Box>
      
      {/*/!* Modal for picking filters *!/*/}
      {/*<FiltersModal*/}
      {/*  open={isFilterModalOpen}*/}
      {/*  onClose={handleCloseFilterModal}*/}
      {/*  onApplyFilters={handleApplyFilters}*/}
      {/*/>*/}

      {/*/!* Modal for picking sorts *!/*/}
      {/*<SortsModal*/}
      {/*  open={isSortModalOpen}*/}
      {/*  onClose={handleCloseSortModal}*/}
      {/*  onApplySorts={handleApplySorts}*/}
      {/*/>*/}
    </>
  );
};
