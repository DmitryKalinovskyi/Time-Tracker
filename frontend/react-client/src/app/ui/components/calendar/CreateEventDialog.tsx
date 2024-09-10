import {Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
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

    const [eventDetails, setEventDetails] = useState<AddCalendarEventInputType>({
        startTime: initialStartTime,
        endTime: initialEndTime
    });

    const lastClicked = useRef<Date>(new Date());

    const onAddButtonClick = () => {
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

        dispatch(apiAddCalendarEvent(details));
        props.onClose();
    }

    // const updateDay = (newDate: Date|null) => {
    //     if (newDate) {
    //         const updatedStartTime = new Date(newDate);
    //         updatedStartTime.setHours(eventDetails.startTime.getHours(), eventDetails.startTime.getMinutes());
    //         const updatedEndTime = new Date(newDate);
    //         updatedEndTime.setHours(eventDetails.endTime.getHours(), eventDetails.endTime.getMinutes());
    //
    //         setEventDetails({
    //             ...eventDetails,
    //             startTime: updatedStartTime,
    //             endTime: updatedEndTime
    //         });
    //     }
    // }

    return <Dialog open={props.isOpen} onClose={props.onClose} {...props.props}>
            <DialogTitle>
                {`Add work time for ${dayjs(props.day).format("DD/MM/YYYY")}`}
            </DialogTitle>
            <DialogContent>
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
                                onChange={(newTime) => setEventDetails({...eventDetails, startTime: newTime})}
                    />
                    <TimePicker label="To"
                                value={dayjs(eventDetails.endTime)}
                                views={['hours', 'minutes']}
                                onChange={(newTime) => setEventDetails({...eventDetails, endTime: newTime})}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="error">Cancel</Button>
                <Button
                    onClick={onAddButtonClick}
                        variant="contained"
                >
                    Add
                </Button>
            </DialogActions>
    </Dialog>
}