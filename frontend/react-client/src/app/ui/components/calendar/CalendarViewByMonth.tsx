import Grid from "@mui/material/Grid";
import {MonthCell} from "./MonthCell.tsx";
import {
    Dialog,
    IconButton,
    Stack
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, {useEffect, useState} from "react";
import {getDaysInMonth} from "../../../misc/DateHelper.ts";
import {UserAutocomplete} from "./UserAutocomplete.tsx";
import {CreateEventDialog} from "./CreateEventDialog.tsx";
import {DayModal} from "./DayModal.tsx";

export function CalendarViewByMonth(){
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [calendarDate, setCalendarDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    })

    const [day, setDay] = useState<Date>(new Date());

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);

    const [days, setDays] = useState<Date[]>([]);
    const [weeks, setWeeks] = useState<number>(5);

    useEffect(() => {
        const firstDay = new Date();
        firstDay.setFullYear(calendarDate.year);
        firstDay.setMonth(calendarDate.month);
        firstDay.setDate(1);
        const calendarDays: Date[] = [];

        // how many weeks we need to display our month?
        const daysInMonth = getDaysInMonth(calendarDate.year, calendarDate.month);
        const daysNeedToDisplay = firstDay.getDay() + daysInMonth;
        const w = Math.ceil(daysNeedToDisplay/7);
        for(let i = 0; i < w*7; i++){
            const day = new Date(firstDay);

            day.setDate(firstDay.getDate() + i - firstDay.getDay());

            calendarDays.push(day);
        }

        setWeeks(w);
        setDays(calendarDays);
    }, [calendarDate]);

    const setToday = () => {
        setCalendarDate({
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        });
    }

    function getMonth(){
        return monthNames[calendarDate.month];
    }

    const moveNext = () =>{
        setCalendarDate({
            year: calendarDate.year + (calendarDate.month == 11 ? 1: 0),
            month: ((calendarDate.month + 1) % 12)
        })
    }

    const movePrevious = () =>{
        setCalendarDate({
            year: calendarDate.year + (calendarDate.month == 0 ? -1: 0),
            month: ((calendarDate.month+11) % 12)
        })
    }

    function onMonthClick(day: Date){
        setDay(day);

        setIsDayModalOpen(true);
    }

    const switchModalToDialog = () => {
        setIsDayModalOpen(false);
        setIsCreateDialogOpen(true);
    }

    const onCreateDialogClose = () => {
        setIsCreateDialogOpen(false);
    }

    const onDayModalClose = () => {
        setIsDayModalOpen(false);
    }

    return <>
        <Stack sx={{height: "100%"}}>
            {/*toolbar*/}
            <Stack direction="row" m={2} spacing={2} alignItems="center">
                <Button color="secondary" variant="contained" onClick={() => setToday()}>Today</Button>
                <IconButton onClick={() => movePrevious()}><ArrowBackIcon/></IconButton>
                <IconButton onClick={() => moveNext()}><ArrowForwardIcon/></IconButton>
                <Typography variant="h5" className="">
                    {`${getMonth()} ${calendarDate.year}`}
                </Typography>
                <UserAutocomplete/>
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
            <Grid sx={{height: "100%"}} container columns={7}>
                {days.map((day,index) =>
                    <Grid item xs={1} key={index} sx={{height: `${100/weeks}%`}}>
                        <MonthCell day={day} month={calendarDate.month} onClick={onMonthClick}/>
                    </Grid>
                )}
            </Grid>

            <DayModal day={day} onClose={onDayModalClose}
                      isOpen={isDayModalOpen}
                      onCreateEvent={() => switchModalToDialog()}
            />
            <CreateEventDialog isOpen={isCreateDialogOpen}
                               day={day}
                               onClose={() => onCreateDialogClose()}/>
        </Stack>
    </>
}