import {Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import React from "react";

interface CreateEventModalProps{
    day?: Date,
    isOpen: boolean,
    onClose: () => void,
    props?
}

export function CreateEventDialog(props: CreateEventModalProps){
    return <Dialog open={props.isOpen} onClose={props.onClose} {...props.props}>
            <DialogTitle>
                Add work time
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{pt: 2}}>
                    {/*<TextField fullWidth placeholder="Going to a party."*/}
                    {/*           onChange={(e) => setDayOff({...dayOff, name: e.target.value})}/>*/}
                    <DatePicker label="Day"
                                value={dayjs(props.day)}
                        // onChange={(newDate) => {
                        //     if (newDate) {
                        //         // setDayOff(newDate.toDate() );
                        //     }
                        // }}
                    />
                    <TimePicker label="From"  views={['hours', 'minutes']}/>
                    <TimePicker label="To"  views={['hours', 'minutes']}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="error">Cancel</Button>
                <Button onClick={props.onClose} variant="contained">
                    Save
                </Button>
            </DialogActions>
    </Dialog>
}