import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { WorkSession } from '../../../types/WorkSession';
import useAuth from '../../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkSession } from '../../../features/timeTracking/timeTrackingSlice';
import { RootState } from '../../../store';
import {DateTimePicker, PickerValidDate} from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface UpdateWorkSessionModalProps {
  open: boolean;
  onClose: () => void;
  initialData: WorkSession;
}

const UpdateWorkSessionModal: React.FC<UpdateWorkSessionModalProps> = ({ open, onClose, initialData }) => {
  const [session, setSession] = useState<WorkSession>(initialData);
  const [errors, setErrors] = useState<string>();
  const dispatch = useDispatch();
  const { isWorkSessionUpdating } = useSelector((state: RootState) => state.timeTracker);

  useEffect(() => {
    setSession(initialData);
    setErrors("");
  }, [initialData]);

  // useEffect(() => {
  //   if (!loading && hasAttemptedSave && !error) {
  //     setHasAttemptedSave(false);
  //   }
  //   if (!loading && hasAttemptedSave && error) {
  //     setErrors(error);
  //     setHasAttemptedSave(false);
  //   }
  // }, [loading, error]);

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
      dispatch(updateWorkSession({
        id: session.id,
        startTime: new Date(session.startTime),
        endTime: new Date(session.endTime)
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Work Session</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', mt: '1rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            {/*<Typography variant='h6' mr={2}>Start Time</Typography>*/}
            <DateTimePicker value={dayjs(session.startTime)}
                            label={"Start Time"}
                            onChange={(pickerValidDate) =>
                                setSession({ ...session, startTime: pickerValidDate.toDate().toString() })}
            />

            {/*<DatePicker */}
            {/*  value={new Date(session.startTime)}*/}
            {/*  format="dd.MM.yyyy HH:mm" */}
            {/*  style={{ width: '70%' }}*/}
            {/*  placeholder="Select Start Time"*/}
            {/*  onOk={(date) => setSession({ ...session, startTime: date.toString() })}*/}
            {/*/>*/}
            {/*<Typography variant='h6' mr={2}>End Time</Typography>*/}
            <DateTimePicker value={dayjs(session.endTime)}
                            label={"End Time"}
                            onChange={(pickerValidDate) =>
                                setSession({ ...session, endTime: pickerValidDate.toDate().toString() })}
            />
            {/*<DatePicker */}
            {/*  value={new Date(session.endTime)}*/}
            {/*  format="dd.MM.yyyy HH:mm"*/}
            {/*  style={{ width: '70%' }}*/}
            {/*  placeholder="Select End Time"*/}
            {/*  onOk={(date) => setSession({ ...session, endTime: date.toString() })}*/}
            {/*/>*/}
          {errors && (
            <Typography color="error" variant="body2">
              {errors}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isWorkSessionUpdating}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={isWorkSessionUpdating}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateWorkSessionModal;
