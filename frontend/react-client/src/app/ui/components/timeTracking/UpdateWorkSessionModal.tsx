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
import { DatePicker } from 'rsuite';
import useAuth from '../../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { updateSession } from '../../../features/timeTracking/timeTrackingSlice';
import { RootState } from '../../../store';

interface UpdateWorkSessionModalProps {
  open: boolean;
  onClose: () => void;
  initialData: WorkSession;
}

const UpdateWorkSessionModal: React.FC<UpdateWorkSessionModalProps> = ({ open, onClose, initialData }) => {
  const [session, setSession] = useState<WorkSession>(initialData);
  const [errors, setErrors] = useState<{ startTime?: string; endTime?: string }>({});
  const { user: me } = useAuth();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.timeTracker);

  useEffect(() => {
    setSession(initialData);
    setErrors({});
  }, [initialData]);



  const validate = () => {
    const tempErrors: { startTime?: string; endTime?: string } = {};
    const currentTime = new Date();
    const startTime = new Date(session.startTime);
    const endTime = new Date(session.endTime!);

    if (!session.startTime) {
      tempErrors.startTime = "Start time is required";
    } else if (startTime > currentTime) {
      tempErrors.startTime = "Start time cannot be in the future";
    }

    if (!session.endTime) {
      tempErrors.endTime = "End time is required";
    } else if (endTime < startTime) {
      tempErrors.endTime = "End time cannot be earlier than start time";
    } else if (endTime > currentTime) {
      const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      if (durationInHours > 8) {
        tempErrors.endTime = "Session duration cannot be longer than 8 hours";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      dispatch(updateSession({
        editorId: me!.id,
        id: session.id,
        startTime: session.startTime.toISOString() as unknown as Date,
        endTime: session.endTime!.toISOString() as unknown as Date
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Work Session</DialogTitle>
      <DialogContent>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <CircularProgress sx={{ color: '#00101D' }} />
          </Box>
        )}
        <Box sx={{ display: 'flex', mt: '1rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box mt={'1rem'} width={'100%'} display={'flex'}>
            <Typography variant='h6' sx={{ verticalAlign: 'middle' }} width={'30%'}>Start Time</Typography>
            <DatePicker 
              value={session.startTime}
              format="dd.MM.yyyy HH:mm" 
              style={{ width: '70%' }}
              placeholder="Select Start Time"
              onOk={(date) => setSession({ ...session, startTime: date })}
            />
          </Box>
          <Box width={'100%'} display={'flex'}>
            <Typography variant='h6' sx={{ verticalAlign: 'middle' }} width={'30%'}>End Time</Typography>
            <DatePicker 
              value={session.endTime}
              format="dd.MM.yyyy HH:mm"
              style={{ width: '70%' }}
              placeholder="Select End Time"
              onOk={(date) => setSession({ ...session, endTime: date })}
            />
          </Box>
          {errors.startTime && (
            <Typography color="error" variant="body2">
              {errors.startTime}
            </Typography>
          )}
          {errors.endTime && (
            <Typography color="error" variant="body2">
              {errors.endTime}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateWorkSessionModal;
