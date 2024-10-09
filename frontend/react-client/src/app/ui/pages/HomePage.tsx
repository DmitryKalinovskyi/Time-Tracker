import Timer from "../components/timeTracking/Timer.tsx";
import { Box } from "@mui/material";
import {SessionTable} from "../components/timeTracking/SessionTable.tsx";
import useIsHavePermission from "../../hooks/useIsHavePermission.ts";
import {TimeTrackingPermission} from "../../features/permissions/permissions.ts";
import {useTimer} from "../components/timeTracking/hooks/useTimer.ts";
import {useState} from "react";
import StyledButton from "../components/timeTracking/StyledButton.tsx";
import FiltersModal from "../components/timeTracking/FiltersModal.tsx";

export default function HomePage() {
    const isHaveTimeTrackingPermission = useIsHavePermission(TimeTrackingPermission)
    const {isTracking} = useTimer();
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const handleOpenFilterModal = () => {
        setFilterModalOpen(true);
    };

    const handleCloseFilterModal = () => {
      setFilterModalOpen(false);
    };
    return (
        <>
            {(isTracking || isHaveTimeTrackingPermission) && <Timer/>}
            <Box display={'flex'} justifyContent={'flex-end'} px={2} m={2} gap={2}>
                <StyledButton label="Filters" onClickHandler={handleOpenFilterModal}/>
            </Box>
            <Box>
                <SessionTable/>
            </Box>

            {/* Modal for picking filters */}
            <FiltersModal
              open={isFilterModalOpen}
              onClose={handleCloseFilterModal}
            />
        </>
    );
}
