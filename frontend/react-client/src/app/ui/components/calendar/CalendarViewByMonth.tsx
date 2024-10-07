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
import React, {useEffect, useState} from "react";
import {UserAutoComplete} from "../shared/UserAutoCompolete/UserAutoComplete.tsx";
import {CreateEventDialog} from "./CreateEventDialog.tsx";
import {DayModal} from "./DayModal.tsx";
import useAuth from "../../../hooks/useAuth.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    changeSelectedMonth,
    MonthType,
    fetchAndSetSelectedUser
} from "../../../features/calendar/calendarSlice.ts";
import {RootState} from "../../../store.ts";
import {useMonthDetails} from "./hooks/useMonthDetails.ts";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function CalendarViewByMonth(){
    const [day, setDay] = useState<Date>(new Date());
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
    const selectedUser = useSelector((state: RootState) => state.calendar.selectedUser);
    const calendarDate: MonthType = useSelector((state: RootState) => state.calendar.selectedMonth);
    const [days, weeksCount] = useMonthDetails(calendarDate);

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

    const changeCalendarDate = (month: MonthType) => {
        dispatch(changeSelectedMonth(month));
    }

    const setCurrentMonth = () => {
        changeCalendarDate({
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        });
    }

    function getMonthName(){
        return monthNames[calendarDate.month];
    }

    const moveNextMonth = () =>{
        changeCalendarDate({
            year: calendarDate.year + (calendarDate.month == 11 ? 1: 0),
            month: ((calendarDate.month + 1) % 12)
        })
    }

    const movePreviousMonth = () =>{
        changeCalendarDate({
            year: calendarDate.year + (calendarDate.month == 0 ? -1: 0),
            month: ((calendarDate.month+11) % 12)
        })
    }

    function handleMonthClick(day: Date){
        setDay(day);
        setIsDayModalOpen(true);
    }

    const switchModalToDialog = () => {
        setIsDayModalOpen(false);
        setIsCreateDialogOpen(true);
    }

    const handleCreateDialogClose = () => {
        setIsCreateDialogOpen(false);
    }

    const handleDayModalClose = () => {
        setIsDayModalOpen(false);
    }

    if(selectedUser == null) return <div></div>

    return <>
        <Stack sx={{height: "100%"}}>
            {/*toolbar*/}
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" m={2} spacing={2} alignItems="center">
                    <Button color="secondary" variant="contained" onClick={() => setCurrentMonth()}>Current month</Button>
                    <IconButton onClick={() => movePreviousMonth()}><ArrowBackIcon/></IconButton>
                    <IconButton onClick={() => moveNextMonth()}><ArrowForwardIcon/></IconButton>
                    <Typography variant="h5">
                        {`${getMonthName()} ${calendarDate.year}`}
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
                    <Grid item xs={1} key={index} sx={{height: `${100/weeksCount}%`, boxSizing: 'border-box'}}>
                        <MonthCell day={day} month={calendarDate.month} events={selectedUser.calendarEvents} onClick={handleMonthClick}/>
                    </Grid>
                )}
            </Grid>

            <DayModal day={day} onClose={handleDayModalClose}
                      isOpen={isDayModalOpen}
                      onCreateEvent={switchModalToDialog}
            />

            <CreateEventDialog isOpen={isCreateDialogOpen}
                               day={day}
                               onClose={handleCreateDialogClose}/>
        </Stack>
    </>
}