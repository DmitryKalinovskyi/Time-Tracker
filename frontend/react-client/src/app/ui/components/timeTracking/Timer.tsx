import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { formatDuration, formatDurationToHMS } from '../../../misc/TimeFormatter';
import { PlayArrow, Stop } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { startSession, stopSession } from '../../../features/timeTracking/timeTrackingSlice';
import {useTimer} from "./hooks/useTimer.ts";

const Timer: React.FC = () => {
  const timeTracker = useSelector((state: RootState) => state.timeTracker);

  const {duration, isTracking} = useTimer();

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    if (isTracking) {
        dispatch(stopSession());
    } else {
        dispatch(startSession());
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
          }}>Total time tracked today: {formatDurationToHMS(duration + timeTracker.todayTotalDuration)} </Typography>
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

