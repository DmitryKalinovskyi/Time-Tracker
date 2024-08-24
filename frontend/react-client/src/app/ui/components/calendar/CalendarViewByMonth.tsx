import Grid from "@mui/material/Grid";
import {MonthCell} from "./MonthCell.tsx";
import {IconButton, Popover, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useEffect, useState} from "react";
export function CalendarViewByMonth(){
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [calendarDate, setCalendarDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    })
    const [days, setDays] = useState<Date[]>([]);

    useEffect(() => {
        const firstDay = new Date();
        firstDay.setFullYear(calendarDate.year);
        firstDay.setMonth(calendarDate.month);
        firstDay.setDate(1);
        const calendarDays: Date[] = [];
        for(let i = 0; i < 35; i++){
            const day = new Date(firstDay);

            day.setDate(firstDay.getDate() + i - firstDay.getDay());

            calendarDays.push(day);
        }

        console.log(calendarDate.month)
        setDays(calendarDays);
    }, [calendarDate]);

    function setToday(){
        setCalendarDate({
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        });
    }

    function getMonth(){
        return monthNames[calendarDate.month];
    }

    function moveNext(){
        setCalendarDate({
            year: calendarDate.year + (calendarDate.month == 11 ? 1: 0),
            month: ((calendarDate.month + 1) % 12)
        })
    }

    function movePrevious(){
        setCalendarDate({
            year: calendarDate.year + (calendarDate.month == 0 ? -1: 0),
            month: ((calendarDate.month+11) % 12)
        })
    }

    return <Stack sx={{height: "100%"}}>
        <Stack direction="row" m={2} spacing={2}>
            <Button color="secondary" onClick={() => setToday()}>Today</Button>
            <IconButton onClick={() => movePrevious()}><ArrowBackIcon/></IconButton>
            <IconButton onClick={() => moveNext()}><ArrowForwardIcon/></IconButton>
            <Typography variant="h4">
                {`${getMonth()} ${calendarDate.year}`}
            </Typography>
            {/*<Popover open>*/}
            {/*    <div>Work</div>*/}
            {/*</Popover>*/}
        </Stack>
        <Grid container columns={7} alignItems="stretch">
            {dayNames.map((day, index) =>
                <Grid item xs={1} key={index}>
                    <div className="h-12 flex border border-t-2 justify-center items-center">
                        <Typography>
                            {day}
                        </Typography>
                    </div>
                </Grid>
            )}
        </Grid>
        <Grid sx={{height: "100%"}} container  columns={7} alignItems="stretch">
            {days.map((day,index) =>
                <Grid item xs={1} key={index}>
                    <MonthCell day={day}/>
                </Grid>
            )}
        </Grid>
    </Stack>
}