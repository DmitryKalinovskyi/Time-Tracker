import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { RootState } from '../../store.ts';
import { startSession, stopSession } from '../../features/timeTracking/timeTrackingSlice.ts';

const SessionControl: React.FC = () => {
  const dispatch = useDispatch();
  const { isTracking, loading } = useSelector((state: RootState) => state.timeTracker);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleStart = () => {
    if (user) {
      dispatch(startSession(user.id)); 
    }
  };
  const handleStop = () => dispatch(stopSession());

  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={4}>
      {isTracking ? (
        <Button variant="contained" color="secondary" onClick={handleStop} disabled={loading}>
          Stop Session
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleStart} disabled={loading}>
          Start Session
        </Button>
      )}
    </Box>
  );
};

export default SessionControl;
