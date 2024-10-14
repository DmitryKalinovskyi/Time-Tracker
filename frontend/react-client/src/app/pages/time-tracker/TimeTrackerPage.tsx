import Timer from "./ui/Timer.tsx";
import { Box } from "@mui/material";
import {SessionTable} from "./ui/SessionTable.tsx";
import useIsHavePermission from "@time-tracker/features/authentification/hooks/useIsHavePermission.ts";
import {TimeTrackingPermission} from "@time-tracker/features/permissions/permissions.ts";
import {useTimer} from "./ui/hooks/useTimer.ts";
import {useState} from "react";
import StyledButton from "./ui/StyledButton.tsx";
import FiltersModal from "./ui/FiltersModal.tsx";
import {AddWorkSessionModal} from "./ui/AddWorkSessionModal.tsx";

export function TimeTrackerPage() {
    const isHaveTimeTrackingPermission = useIsHavePermission(TimeTrackingPermission)
    const {isTracking} = useTimer();
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [isAddWorkSessionModalOpen, setIsAddWordSessionModalOpen] = useState(false);
    const handleOpenFilterModal = () => {
        setFilterModalOpen(true);
    };

    const handleCloseFilterModal = () => {
      setFilterModalOpen(false);
    };

    const handleOpenAddWorkSessionModal = () => {
        setIsAddWordSessionModalOpen(true);
    };

    const handleCloseAddWordSessionModal = () => {
        setIsAddWordSessionModalOpen(false);
    }

    return (
        <>
            {(isTracking || isHaveTimeTrackingPermission) && <Timer/>}
            <Box display={'flex'} justifyContent={'flex-end'} px={2} m={2} gap={2}>
                <StyledButton label="Add session" onClickHandler={handleOpenAddWorkSessionModal}/>
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

            <AddWorkSessionModal open={isAddWorkSessionModalOpen}
                                 onClose={handleCloseAddWordSessionModal}/>
        </>
    );
}
