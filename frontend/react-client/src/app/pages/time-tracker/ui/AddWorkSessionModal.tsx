import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {AddWorkSessionPayload, addWorkSession} from '@time-tracker/features/timeTracking/timeTrackingSlice.ts';
import { RootState } from '../../../store.ts';
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {UserAutoComplete} from "../../../shared/ui/UserAutoComplete/UserAutoComplete.tsx";
import User from "@time-tracker/types/User.ts";
import useIsHavePermission from "@time-tracker/features/authentification/hooks/useIsHavePermission.ts";
import {ManageUsersSessionsPermission} from "@time-tracker/features/permissions/permissions.ts";

interface AddWorkSessionModalProps {
    open: boolean;
    onClose: () => void;
}

export function AddWorkSessionModal({ open, onClose }: AddWorkSessionModalProps){
    const me = useSelector((state: RootState) => state.auth.user);
    const isCanManageUsersSessions = useIsHavePermission(ManageUsersSessionsPermission);
    const [session, setSession] = useState<AddWorkSessionPayload>({
        startTime: dayjs().set("hours", 8).set("minute", 0).set("seconds", 0).toDate(),
        endTime: dayjs().set("hours", 16).set("minute", 0).set("seconds", 0).toDate(),
        userId: me?.id
    });
    const [selectedUser, setSelectedUser] = useState<User>(me);
    const [errors, setErrors] = useState<string>();
    const dispatch = useDispatch();

    const validate = () => {
        let localError = "";
        const startTime = new Date(session.startTime);
        const endTime = new Date(session.endTime!);

        // Check if startTime is present
        if (!session.startTime) {
            localError = "Start time is required";
        }

        // Check if endTime is present
        if (!session.endTime) {
            localError = "End time is required";
        }
        else if (endTime < startTime) {
            localError = "End time cannot be earlier than start time";
        }
        setErrors(localError);
        return localError === "";
    };


    const handleSave = () => {
        if (validate()) {
            const payload = {
                startTime: session.startTime,
                endTime: session.endTime,
                userId: selectedUser.id
            };
            console.log(payload);

            dispatch(addWorkSession(payload));
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Work Session</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', mt: '1rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                    {isCanManageUsersSessions &&
                    <UserAutoComplete selectedUser={selectedUser}
                                      onChange={(u) => setSelectedUser(u)}/>}

                    <DateTimePicker value={dayjs(session.startTime)}
                                    label={"Start Time"}
                                    onChange={(pickerValidDate) =>
                                        setSession({ ...session, startTime: pickerValidDate.toDate()})}
                    />

                    <DateTimePicker value={dayjs(session.endTime)}
                                    label={"End Time"}
                                    onChange={(pickerValidDate) =>
                                        setSession({ ...session, endTime: pickerValidDate.toDate()})}
                    />
                    {errors && (
                        <Typography color="error" variant="body2">
                            {errors}
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

