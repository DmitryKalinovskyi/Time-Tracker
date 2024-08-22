import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';
import { WorkSession } from '../../../types/WorkSession';
import moment from 'moment';

interface UpdateWorkSessionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedSession: WorkSession) => void;
  initialData: WorkSession;
}

const UpdateWorkSessionModal: React.FC<UpdateWorkSessionModalProps> = ({ open, onClose, onSave, initialData }) => {
  const [session, setSession] = useState<WorkSession>({
    ...initialData,
    startTime: moment.utc(initialData.startTime).local().format('YYYY-MM-DDTHH:mm'),
    endTime: moment.utc(initialData.endTime).local().format('YYYY-MM-DDTHH:mm'),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ startTime?: string; endTime?: string }>({});

  useEffect(() => {
    setSession({
      ...initialData,
      startTime: moment.utc(initialData.startTime).local().format('YYYY-MM-DDTHH:mm'),
      endTime: moment.utc(initialData.endTime).local().format('YYYY-MM-DDTHH:mm'),
    });
    setErrors({});
  }, [initialData]);

  const validate = () => {
    let tempErrors: { startTime?: string; endTime?: string } = {};

    const currentTime = moment();
    const startTime = moment(session.startTime);
    const endTime = moment(session.endTime);

    if (!session.startTime) {
      tempErrors.startTime = "Start time is required";
    } else if (startTime.isAfter(currentTime)) {
      tempErrors.startTime = "Start time cannot be in the future";
    }

    if (!session.endTime) {
      tempErrors.endTime = "End time is required";
    } else if (endTime.isBefore(startTime)) {
      tempErrors.endTime = "End time cannot be earlier than start time";
    } else if (endTime.isAfter(currentTime)) {
      tempErrors.endTime = "End time cannot be in the future";
    } else if (endTime.diff(startTime, 'hours') > 8) {
      tempErrors.endTime = "Session duration cannot be longer than 8 hours";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      setIsSaving(true);

      const updatedSession: WorkSession = {
        ...session,
        startTime: new Date(moment(session.startTime).utc().format()),
        endTime: new Date(moment(session.endTime).utc().format()),
      };

      onSave(updatedSession);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSession({
      ...session,
      [name]: value,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Work Session</DialogTitle>
      <DialogContent>
        {isSaving && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <CircularProgress sx={{ color: '#00101D' }} />
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Start Time"
            name="startTime"
            type="datetime-local"
            value={session.startTime}
            onChange={handleChange}
            error={!!errors.startTime}
            helperText={errors.startTime}
            fullWidth
            sx={{ mt: 2 }}
            required
          />
          <TextField
            label="End Time"
            name="endTime"
            type="datetime-local"
            value={session.endTime}
            onChange={handleChange}
            error={!!errors.endTime}
            helperText={errors.endTime}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isSaving}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateWorkSessionModal;
