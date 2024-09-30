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
import React, {useEffect, useLayoutEffect, useState} from "react";
import {getDaysInMonth} from "../../../misc/DateHelper.ts";
import {UserAutoComplete} from "./UserAutoComplete/UserAutoComplete.tsx";
import {CreateEventDialog} from "./CreateEventDialog.tsx";
import {DayModal} from "./DayModal.tsx";
import useAuth from "../../../hooks/useAuth.ts";
import {useDispatch, useSelector} from "react-redux";
import {changeSelectedUser} from "../../../features/calendar/calendarSlice.ts";
import {RootState} from "../../../store.ts";

interface CalendarDate{
    year: number,
    month: number
}

export function CalendarViewByMonth(){
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [calendarDate, setCalendarDate] = useState<CalendarDate>({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    })

    const [day, setDay] = useState<Date>(new Date());
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
    const [days, setDays] = useState<Date[]>([]);
    const [weeks, setWeeks] = useState<number>(5);
    const selectedUser = useSelector((state: RootState) => state.calendar.selectedUser);

    const dispatch = useDispatch();
    const me = useAuth().user;

    // in first render select me
    useLayoutEffect(() => {
        if(me)
            dispatch(changeSelectedUser(me));
        changeCalendarDate(calendarDate);
    }, []);

    const changeCalendarDate = (date: CalendarDate) => {
        const firstDay = new Date();
        firstDay.setFullYear(date.year);
        firstDay.setMonth(date.month);
        firstDay.setDate(1);
        const calendarDays: Date[] = [];

        // how many weeks we need to display our month?
        const daysInMonth = getDaysInMonth(date.year, date.month);
        const daysNeedToDisplay = firstDay.getDay() + daysInMonth;
        const w = Math.ceil(daysNeedToDisplay / 7);
        for (let i = 0; i < w * 7; i++) {
            const day = new Date(firstDay);

            day.setDate(firstDay.getDate() + i - firstDay.getDay());

            calendarDays.push(day);
        }

        setCalendarDate(date);
        setWeeks(w);
        setDays(calendarDays);
    }

    const setCurrentMonth = () => {
        changeCalendarDate({
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        });
    }

    function getMonth(){
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

    return <>
        <Stack sx={{height: "100%"}}>
            {/*toolbar*/}
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" m={2} spacing={2} alignItems="center">
                    <Button color="secondary" variant="contained" onClick={() => setCurrentMonth()}>Current month</Button>
                    <IconButton onClick={() => movePreviousMonth()}><ArrowBackIcon/></IconButton>
                    <IconButton onClick={() => moveNextMonth()}><ArrowForwardIcon/></IconButton>
                    <Typography variant="h5">
                        {`${getMonth()} ${calendarDate.year}`}
                    </Typography>
                </Stack>

                <Stack direction="row"  m={2} spacing={2} alignItems="center">
                    <Box sx={{width: '500px'}}>
                        <UserAutoComplete selectedUser={selectedUser} onChange={(user) => {
                            if (user) dispatch(changeSelectedUser(user))
                        }}/>
                    </Box>
                    {/*<Button color="secondary" onClick={() => dispatch(changeSelectedUser(me))} variant="contained">View my</Button>*/}
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
                    <Grid item xs={1} key={index} sx={{height: `${100/weeks}%`, boxSizing: 'border-box'}}>
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