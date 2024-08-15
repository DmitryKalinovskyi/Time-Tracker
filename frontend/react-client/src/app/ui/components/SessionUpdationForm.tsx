import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import moment from 'moment';
import { updateSession } from '../../features/timeTracking/timeTrackingSlice';
import { WorkSession } from '../../types/WorkSession';
import { RootState } from '../../store';

interface SessionUpdateFormProps {
  session: WorkSession;
  open: boolean;
  onClose: () => void;
}

const SessionUpdateForm: React.FC<SessionUpdateFormProps> = ({ session, open, onClose }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState<string>(moment(session.startTime).format('YYYY-MM-DDTHH:mm'));
  const [endTime, setEndTime] = useState<string>(session.endTime ? moment(session.endTime).format('YYYY-MM-DDTHH:mm') : '');
  const user = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    setStartTime(moment(session.startTime).format('YYYY-MM-DDTHH:mm'));
    setEndTime(session.endTime ? moment(session.endTime).format('YYYY-MM-DDTHH:mm') : '');
  }, [session]);

  const handleSubmit = () => {
    dispatch(updateSession({
      id: session.id,
      startTime: moment(startTime).toDate(),
      endTime: moment(endTime).toDate(),
      editorId: user ? user.id : 0
    }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Session</DialogTitle>
      <DialogContent>
        <TextField
          label="Start Time"
          type="datetime-local"
          fullWidth
          margin="normal"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <TextField
          label="End Time"
          type="datetime-local"
          fullWidth
          margin="normal"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionUpdateForm;
