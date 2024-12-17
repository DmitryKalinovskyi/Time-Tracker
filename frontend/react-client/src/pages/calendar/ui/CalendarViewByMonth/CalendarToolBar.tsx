import {Box, IconButton, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import {UserAutoComplete} from "@time-tracker/shared/ui/UserAutoComplete";
import React from "react";
import {useMonthState} from "@time-tracker/pages/calendar/ui/hooks/useMonthState.ts";
import {useSelectedUser} from "@time-tracker/pages/calendar/ui/hooks/useSelectedUser.ts";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function CalendarToolBar(){
    const {selectedMonth, setCurrentMonth, moveToPreviousMonth, moveToNextMonth} = useMonthState();
    const {selectedUser, selectMe, selectUser, selectedUserIsMe} = useSelectedUser();

    function getMonthName(){
        return monthNames[selectedMonth.month];
    }

    return <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" m={2} spacing={2} alignItems="center">
            <Button color="secondary" variant="contained" onClick={() => setCurrentMonth()}>Current month</Button>
            <IconButton onClick={() => moveToPreviousMonth()}><ArrowBackIcon/></IconButton>
            <IconButton onClick={() => moveToNextMonth()}><ArrowForwardIcon/></IconButton>
            <Typography variant="h5">
                {`${getMonthName()} ${selectedMonth.year}`}
            </Typography>
        </Stack>

        <Stack direction="row"  m={2} spacing={2} alignItems="center">
            <Box sx={{width: '500px'}}>
                <UserAutoComplete selectedUser={selectedUser} onChange={(user) => {
                    if (user) selectUser(user.id)
                }}/>
            </Box>
            <Button color="secondary"
                    disabled={selectedUserIsMe}
                    onClick={selectMe}
                    variant="contained">View my</Button>
        </Stack>
    </Stack>
}