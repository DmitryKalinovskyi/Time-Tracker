import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Modal, ModalRoot, Paper} from "@mui/material";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
interface DayModalProps{
    isOpen: boolean
    day: Date,
    onClose: () => void,
    onCreateEvent: () => void
}

export function DayModal(props: DayModalProps){
    const events = [
        { start: "2024-08-30T00:00:00Z", end: "2024-08-31T01:00:00Z" },
        { start: "2024-09-01T01:00:00Z", end: "2024-09-02T02:00:00Z" },
        { start: "2024-09-03T02:00:00Z", end: "2024-09-04T03:00:00Z" },
        { start: "2024-09-05T03:00:00Z", end: "2024-09-06T04:00:00Z" },
        { start: "2024-09-07T04:00:00Z", end: "2024-09-08T05:00:00Z" }
    ];

    const isYourEvents = true;

    return <>
        <Dialog open={props.isOpen} onClose={props.onClose}>
            <DialogTitle>
                Work time for {dayjs(props.day).format("DD/MM/YYYY")}
            </DialogTitle>
            <DialogContent>
                <List sx={{margin: '0 auto',
                    borderRadius: '8px',

                }}>
                    {events.map((event, index) =>
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
                                primary={`${dayjs(event.start).format("hh:mm A")} - ${dayjs(event.end).format("hh:mm A")}`}
                            />
                            {isYourEvents &&
                            <div className="ml-4">
                                <IconButton color="primary"
                                    // onClick={() => onEdit(event)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error"
                                    // onClick={() => onDelete(event)}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </div>
                            }
                        </ListItem>
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <IconButton onClick={props.onCreateEvent}><AddIcon/></IconButton>
            </DialogActions>
        </Dialog>
        </>
}