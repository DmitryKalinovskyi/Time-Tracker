import Grid from "@mui/material/Grid";
import {MonthCell} from "./MonthCell.tsx";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {CalendarEvent} from "../../../types/CalendarEvent.ts";
import {useDispatch} from "react-redux";
import {addCalendarEvent} from "../../../features/calendar/calendarSlice.ts";
import {getDaysInMonth} from "../../../misc/DateHelper.ts";

export function CalendarViewByMonth(){
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dispatch = useDispatch();
    const [calendarDate, setCalendarDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    })

    const [calendarEvent, setCalendarEvent] = useState<CalendarEvent|null>({
       name: "",
        day: new Date()
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

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
        console.log("Days in month: " + daysInMonth);
        console.log("Days need to display: " + daysNeedToDisplay);
        const w = Math.ceil(daysNeedToDisplay/7);
        console.log("weeks: " + w);
        for(let i = 0; i < w*7; i++){
            const day = new Date(firstDay);

            day.setDate(firstDay.getDate() + i - firstDay.getDay());

            calendarDays.push(day);
        }

        setWeeks(w);
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

    function onMonthClick(day: Date){
        setCalendarEvent({name: "", day});
        setIsModalOpen(true);
    }

    function createCalendarEvent(){
        setIsModalOpen(false);
        if(calendarEvent)
        dispatch(addCalendarEvent(calendarEvent));
    }

    return <><Stack sx={{height: "100%"}}>
        <Stack direction="row" m={2} spacing={2} alignItems="center">
            <Button color="secondary" variant="contained" onClick={() => setToday()}>Today</Button>
            <IconButton onClick={() => movePrevious()}><ArrowBackIcon/></IconButton>
            <IconButton onClick={() => moveNext()}><ArrowForwardIcon/></IconButton>
            <Typography variant="h5" className="">
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
                        <Typography variant="h6">
                            {day}
                        </Typography>
                    </div>
                </Grid>
            )}
        </Grid>
        <Grid sx={{height: "100%"}} container  columns={7}>
            {days.map((day,index) =>
                <Grid item xs={1} key={index} sx={{height: `${100/weeks}%`}}>
                    <MonthCell day={day} month={calendarDate.month} onClick={onMonthClick}/>
                </Grid>
            )}
        </Grid>
    </Stack>
        <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        >
            <DialogTitle>
                Create new event
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                <TextField fullWidth placeholder="Going to a party."
                           onChange={(e) => setCalendarEvent({...calendarEvent, name: e.target.value})}/>
                <DatePicker label="Event day" name="startDate"  sx={{width: "100%"}}
                            value={dayjs(calendarEvent?.day)}
                            onChange={(newDate) => {
                                if (newDate) {
                                    setCalendarEvent({ ...calendarEvent, day: newDate.toDate() });
                                }
                            }}
                />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsModalOpen(false)} color="error">Cancel</Button>
                <Button onClick={() => createCalendarEvent()} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </>
}