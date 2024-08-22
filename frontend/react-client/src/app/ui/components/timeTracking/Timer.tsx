import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { formatDuration, formatDurationToHMS } from '../../../misc/TimeFormatter';
import { PlayArrow, Stop } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { startSession, stopSession } from '../../../features/timeTracking/timeTrackingSlice';
import { useTimerContext } from '../../../features/timeTracking/TimerProvider';

const Timer: React.FC = () => {
  const timeTracker = useSelector((state: RootState) => state.timeTracker);

  const { duration, isTracking, startTimer, stopTimer, setInitialDuration, setInitialIsTracking } = useTimerContext();

  const user = useSelector((state: RootState) => state.auth.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (timeTracker) {
      setInitialDuration(timeTracker.currentSessionDuration);
      setInitialIsTracking(timeTracker.isTracking);
    }
  }, [timeTracker.currentSessionDuration]);

  const handleButtonClick = () => {
    if (isTracking) {
      stopTimer();
      dispatch(stopSession()); 
    } else {
      if (user) {
        startTimer();
        dispatch(startSession(user.id));
      }
    }
  };
  
  return (
    <>
    <Box sx={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      p: '2rem',
      height: '30%'}}>
        <Box sx={{
          display: 'flex',
        }}>
            <Typography sx={{
              textAlign: 'center',
              typography: 'h1',
              color: '#00101D'
            }}>
              {formatDuration(duration).slice(0, -3)}
            </Typography>
            <Typography sx={{
              textAlign: 'center',
              typography: 'h1',
              color: '#00101D',
              opacity: 0.7,
            }}>
              {formatDuration(duration).slice(-3)}
            </Typography>
          </Box>
          <Typography sx={{
            mb:'1rem',
            textAlign: 'center',
            typography: 'body1',
            color: '#00101D',
            opacity: 0.85,
          }}>Total time tracked today: {formatDurationToHMS(1234)} </Typography>
          <Box>
            <IconButton
              onClick={handleButtonClick}
              disabled={isTracking && duration <= 1}
              sx={{
                background: isTracking
                  ? 'linear-gradient(135deg, #660000 0%, #cc0000 50%, #ff3333 100%)' // Red gradient for "stop"
                  : 'linear-gradient(135deg, #00101D 0%, #003366 50%, #006699 100%)', // Original blue gradient for "play"
                color: '#fff',
                width: '64px',
                height: '64px',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                '&:hover': {
                  background: isTracking
                    ? 'linear-gradient(135deg, #660000 0%, #cc0000 50%, #ff3333 100%)' // Red gradient for "stop"
                    : 'linear-gradient(135deg, #00101D 0%, #003366 50%, #006699 100%)', // Original blue gradient for "play"
                },
              }}
            >
              {isTracking ? <Stop sx={{ fontSize: '32px' }} /> : <PlayArrow sx={{ fontSize: '32px' }} />}
            </IconButton>
          </Box>
    </Box>
    </>
  );
};

export default Timer;

