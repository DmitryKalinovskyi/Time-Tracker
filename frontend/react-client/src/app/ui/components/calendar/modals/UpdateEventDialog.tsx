import {Alert, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {CalendarEvent} from "../../../../types/CalendarEvent.ts";
import {apiUpdateCalendarEvent} from "../../../../features/calendar/calendarSlice.ts";

interface UpdateEventDialogProps{
    calendarEvent: CalendarEvent
    isOpen: boolean,
    onClose: () => void,
    props?
}

export function UpdateEventDialog(props: UpdateEventDialogProps){
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [calendarEvent, setCalendarEvent] = useState(props.calendarEvent);
    const lastClicked = useRef<Date>(new Date());

    const handleUpdateButtonClick = () => {
        // prevent double click
        if (new Date().getTime() - lastClicked < 1300) return;
        lastClicked.current = new Date();

        // make frontend validation
        if (calendarEvent.endTime < calendarEvent.startTime) {
            setError("The end time cannot be earlier than the start time. Please select a valid time range.");
            return;
        }

        console.log(calendarEvent);
        dispatch(apiUpdateCalendarEvent(calendarEvent));
        props.onClose();
    }

    const handleClose = () => {
        props.onClose();
    }

    return <Dialog open={props.isOpen}
                   onClose={handleClose} {...props.props}
    >
        <DialogTitle>
            {`Update work time for ${dayjs(props.calendarEvent.startTime).format("DD/MM/YYYY")}`}
        </DialogTitle>
        <DialogContent sx={{width: "360px"}}>
            <Stack spacing={2} sx={{pt: 2}}>
                <TimePicker label="From"
                            value={dayjs(calendarEvent.startTime)}
                            views={['hours', 'minutes']}
                            onChange={(newTime) => setCalendarEvent({...calendarEvent, startTime: newTime.toISOString()})}
                />
                <TimePicker label="To"
                            value={dayjs(calendarEvent.endTime)}
                            views={['hours', 'minutes']}
                            onChange={(newTime) => setCalendarEvent({...calendarEvent, endTime: newTime.toISOString()})}
                />
                {error &&
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                }
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="error">Cancel</Button>
            <Button
                onClick={handleUpdateButtonClick}
                variant="contained"
            >
                Update
            </Button>
        </DialogActions>
    </Dialog>
}