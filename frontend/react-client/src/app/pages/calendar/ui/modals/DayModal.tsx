import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import dayjs from "dayjs";
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {isSameDay} from "@time-tracker/shared/misc/DateHelper.ts";
import {useIsMe} from "@time-tracker/features/authentification/hooks/useIsMe.ts";
import {CalendarEvent} from "@time-tracker/types/CalendarEvent.ts";
import {apiDeleteCalendarEvent} from "@time-tracker/features/calendar/calendarSlice.ts";
interface DayModalProps{
    isOpen: boolean
    day: Date,
    onClose: () => void,
    onCreateEvent: () => void,
    onUpdateEvent: (calendarEvent: CalendarEvent) => void
}

export function DayModal(props: DayModalProps){
    const dispatch = useDispatch();

    const selectedUser = useSelector((state: RootState) => state.calendar.selectedUser);
    const events = selectedUser
        ?.calendarEvents
        ?.filter(value => isSameDay(props.day, new Date(value.startTime)))
        ?? [];

    const isYourEvents = useIsMe(selectedUser);

    return <>
        <Dialog open={props.isOpen}
                onClose={props.onClose}>
            <DialogTitle>
                Work time for {dayjs(props.day).format("DD/MM/YYYY")}
            </DialogTitle>
            <DialogContent sx={{height: "300px", width: "360px"}}>
                <List sx={{margin: '0 auto',
                    borderRadius: '8px',
                }}>
                    {events && events.length > 0 ? events.map((event: CalendarEvent, index: number) =>
                        <ListItem
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            <ListItemText
                                primary={`${dayjs(event.startTime)
                                    .format("hh:mm A")} -
                                    ${dayjs(event.endTime)
                                    .format("hh:mm A")}`}
                            />
                            {isYourEvents &&
                            <div className="ml-4">
                                <IconButton color="primary"
                                            onClick={() => props.onUpdateEvent(event)}
                                >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="error"
                                    onClick={() => dispatch(apiDeleteCalendarEvent(event.id))}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </div>
                            }
                        </ListItem>
                    ):
                        <Typography className="text-gray-400">Day off.</Typography>
                    }
                </List>
            </DialogContent>
            {isYourEvents &&
            <DialogActions>
                <IconButton onClick={props.onCreateEvent}><AddIcon/></IconButton>
            </DialogActions>
            }
        </Dialog>
        </>
}