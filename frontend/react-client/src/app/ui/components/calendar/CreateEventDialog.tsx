import {Alert, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import React, {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {AddCalendarEventInputType, apiCreateCalendarEvent} from "../../../features/calendar/calendarSlice.ts";

interface CreateEventModalProps{
    day: Date,
    isOpen: boolean,
    onClose: () => void,
    props?
}

const getInitialEventDetails = (day): AddCalendarEventInputType => {
    const initialStartTime = new Date(day);
    initialStartTime.setHours(8, 0);
    const initialEndTime = new Date(day);
    initialEndTime.setHours(16, 0);

    return {
        startTime: initialStartTime,
        endTime: initialEndTime
    };
}

const extractDetails = (day, eventDetails) => {
    const details: AddCalendarEventInputType = {
        startTime: new Date(day),
        endTime: new Date(day),
    };

    details.startTime.setHours(eventDetails.startTime.getHours());
    details.startTime.setMinutes(eventDetails.startTime.getMinutes());

    details.endTime.setHours(eventDetails.endTime.getHours());
    details.endTime.setMinutes(eventDetails.endTime.getMinutes());

    return details;
}

export function CreateEventDialog(props: CreateEventModalProps){
    const dispatch = useDispatch();

    const [error, setError] = useState<string | null>(null);
    const [eventDetails, setEventDetails] = useState(() => getInitialEventDetails(props.day));
    const lastClicked = useRef<Date>(new Date());

    const handleAddButtonClick = () => {
        // prevent double click
        if (new Date().getTime() - lastClicked < 1300) return;
        lastClicked.current = new Date();

        const details = extractDetails(props.day, eventDetails);

        if (details.endTime < details.startTime) {
            setError("The end time cannot be earlier than the start time. Please select a valid time range.");
            return;
        }

        dispatch(apiCreateCalendarEvent(details));
        props.onClose();
    }

    const handleClose = () => {
        props.onClose();
    }

    return <Dialog open={props.isOpen}
                   onClose={handleClose} {...props.props}
    >
            <DialogTitle>
                {`Add work time for ${dayjs(props.day).format("DD/MM/YYYY")}`}
            </DialogTitle>
                <DialogContent sx={{width: "360px"}}>
                <Stack spacing={2} sx={{pt: 2}}>
                    <TimePicker label="From"
                                value={dayjs(eventDetails.startTime)}
                                views={['hours', 'minutes']}
                                onChange={(newTime) => setEventDetails({...eventDetails, startTime: newTime.toDate()})}
                    />
                    <TimePicker label="To"
                                value={dayjs(eventDetails.endTime)}
                                views={['hours', 'minutes']}
                                onChange={(newTime) => setEventDetails({...eventDetails, endTime: newTime.toDate()})}
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
                    onClick={handleAddButtonClick}
                        variant="contained"
                >
                    Add
                </Button>
            </DialogActions>
    </Dialog>
}