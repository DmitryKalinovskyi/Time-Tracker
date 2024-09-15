import {Alert, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import React, {useRef, useState} from "react";
import {AddCalendarEventInputType, apiAddCalendarEvent} from "../../../features/calendar/calendarEpic.ts";
import {useDispatch} from "react-redux";

interface CreateEventModalProps{
    day: Date,
    isOpen: boolean,
    onClose: () => void,
    props?
}

export function CreateEventDialog(props: CreateEventModalProps){
    const dispatch = useDispatch();

    const initialStartTime = new Date(props.day);
    initialStartTime.setHours(8, 0);
    const initialEndTime = new Date(props.day);
    initialEndTime.setHours(16, 0);

    const [error, setError] = useState<string | null>(null);

    const [eventDetails, setEventDetails] = useState<AddCalendarEventInputType>({
        startTime: initialStartTime,
        endTime: initialEndTime
    });

    const lastClicked = useRef<Date>(new Date());

    const handleAddButtonClick = () => {
        if (new Date().getTime() - lastClicked < 1300) return;

        lastClicked.current = new Date();
        const details: AddCalendarEventInputType = {
            startTime: new Date(props.day),
            endTime: new Date(props.day),
        };

        details.startTime.setHours(eventDetails.startTime.getHours());
        details.startTime.setMinutes(eventDetails.startTime.getMinutes());

        details.endTime.setHours(eventDetails.endTime.getHours());
        details.endTime.setMinutes(eventDetails.endTime.getMinutes());

        if (details.endTime < details.startTime) {
            setError("The end time cannot be earlier than the start time. Please select a valid time range.");
            return;
        }

        setError(null);
        dispatch(apiAddCalendarEvent(details));
        props.onClose();
    }

    const handleClose = () => {
        setError(null);
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
                    {/*<TextField fullWidth placeholder="Going to a party."*/}
                    {/*           onChange={(e) => setDayOff({...dayOff, name: e.target.value})}/>*/}
                    {/*<DatePicker label="Day"*/}
                    {/*            value={dayjs(eventDetails.startTime)}*/}
                    {/*            onChange={(newDate) => updateDay(newDate)}*/}
                    {/*/>*/}
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