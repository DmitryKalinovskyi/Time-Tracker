import Grid from "@mui/material/Grid";
import {MonthCell} from "./MonthCell.tsx";
import {
    Box,
    IconButton,
    Stack
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, {useEffect} from "react";
import useAuth from "@time-tracker/features/authentification/hooks/useAuth.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchAndSetSelectedUser
} from "@time-tracker/features/calendar/calendarSlice.ts";
import {RootState} from "../../../store.ts";
import {useMonthDetails} from "./hooks/useMonthDetails.ts";
import {useMonthSetters} from "./hooks/useMonthSetters.ts";
import {useDayModal} from "./hooks/useDayModal.ts";
import {UserAutoComplete} from "@time-tracker/shared/ui/UserAutoComplete";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function CalendarViewByMonth(){
    const selectedUser = useSelector((state: RootState) => state.calendar.selectedUser);
    const [selectedMonth, setCurrentMonth, moveToPreviousMonth, moveToNextMonth] = useMonthSetters();
    const [days, weeksCount] = useMonthDetails(selectedMonth);
    const openDayModal = useDayModal();
    const dispatch = useDispatch();
    const me = useAuth().user;

    useEffect(() => {
        if(selectedUser == null)
            selectMe();
    }, []);

    const selectMe = () => {
        if(me)
        dispatch(fetchAndSetSelectedUser(me.id));
    }

    function getMonthName(){
        return monthNames[selectedMonth.month];
    }

    function handleMonthClick(day: Date){
        openDayModal(day);
    }

    if(selectedUser == null) return null;

    return <>
        <Stack sx={{height: "100%"}}>
            {/*toolbar*/}
            <Stack direction="row" justifyContent="space-between">
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
                            if (user) dispatch(fetchAndSetSelectedUser(user.id))
                        }}/>
                    </Box>
                    <Button color="secondary"
                            disabled={me?.id == selectedUser.id}
                            onClick={selectMe}
                            variant="contained">View my</Button>
                </Stack>
            </Stack>


            {/*calendar week days*/}
            <Grid container columns={7} alignItems="stretch">
                {dayNames.map((day, index) =>
                    <Grid item xs={1} key={index}>
                        <div className="h-12 flex border border-t-2 justify-center items-center">
                            <Typography variant="h6">
                                {day}
                            </Typography>
                        </div>
                    </Grid>
                )}
            </Grid>

            {/*calendar cells*/}
            <Grid sx={{height: "100%"}}
                  container
                  columns={7} >
                {days.map((day,index) =>
                    <Grid item
                          xs={1}
                          key={index}
                          sx={{height: `${100/weeksCount}%`, boxSizing: 'border-box'}}>
                        <MonthCell day={day}
                                   month={selectedMonth.month}
                                   onClick={handleMonthClick}/>
                    </Grid>
                )}
            </Grid>
        </Stack>
    </>
}