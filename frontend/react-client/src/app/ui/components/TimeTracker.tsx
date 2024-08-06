import React, { useState } from 'react';
import { Button, TextField, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface Period {
  id: number;
  actionName: string;
  duration: number; // in seconds
  startTime: Date;
  endTime: Date;
}

const TimeTracker: React.FC = () => {
  const [actionName, setActionName] = useState<string>('');
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [periods, setPeriods] = useState<Period[]>([]);

  const handleStart = () => {
    if (!actionName.trim()) return;

    if (!isRunning) {
      setStartTime(new Date());
    }

    setIsRunning(true);
    setTimer(setInterval(() => setElapsedTime((prev) => prev + 1), 1000));
  };

  const handlePause = () => {
    setIsRunning(false);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const handleStop = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    if (startTime) {
      const newPeriod: Period = {
        id: periods.length + 1,
        actionName,
        duration: elapsedTime,
        startTime,
        endTime: new Date(),
      };

      // Check if the last period has the same action name, if so, update its duration and end time
      if (periods.length > 0 && periods[periods.length - 1].actionName === actionName) {
        const updatedPeriods = [...periods];
        const lastPeriod = updatedPeriods.pop()!;
        updatedPeriods.push({
          ...lastPeriod,
          duration: lastPeriod.duration + elapsedTime, // Accumulate the duration
          endTime: newPeriod.endTime,
        });
        setPeriods(updatedPeriods);
      } else {
        setPeriods([...periods, newPeriod]);
      }
    }

    setIsRunning(false);
    setElapsedTime(0); // Reset the timer display
  };

  const handleRemovePeriod = (id: number) => {
    setPeriods(periods.filter((period) => period.id !== id));
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Typography variant="h5" gutterBottom className="text-blue-800">
        Time Tracker
      </Typography>
      <TextField
        label="Action Name"
        variant="outlined"
        value={actionName}
        onChange={(e) => setActionName(e.target.value)}
        fullWidth
        className="mb-4"
      />
      <div className="flex items-center space-x-4 mb-4">
        <Button variant="contained" color="primary" onClick={handleStart} disabled={isRunning}>
          Start
        </Button>
        <Button variant="contained" color="secondary" onClick={handlePause} disabled={!isRunning}>
          Pause
        </Button>
        <Button variant="contained" onClick={handleStop} disabled={!isRunning && !elapsedTime}>
          Stop
        </Button>
        <Typography variant="h6" className="ml-4 text-blue-800">
          {formatTime(elapsedTime)}
        </Typography>
      </div>
      <Typography variant="h6" gutterBottom className="text-blue-800">
        Periods
      </Typography>
      <List>
        {periods.map((period) => (
          <ListItem key={period.id} className="flex justify-between">
            <ListItemText
              primary={`${period.actionName} (${formatTime(period.duration)})`}
              secondary={`Start: ${period.startTime.toLocaleString()} - End: ${period.endTime.toLocaleString()}`}
            />
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemovePeriod(period.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TimeTracker;
