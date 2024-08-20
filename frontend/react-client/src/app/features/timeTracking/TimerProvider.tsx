import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TimerContextType {
  duration: number;
  isTracking: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  setInitialDuration: (duration: number) => void;
  setInitialIsTracking: (isTracking: boolean) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

interface TimerProviderProps {
    children: ReactNode;
    initialDuration?: number;
    initialIsTracking?: boolean;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({
    children,
    initialDuration = 0,
    initialIsTracking = false,
  }) => {
    const [duration, setDuration] = useState(initialDuration);
    const [isTracking, setIsTracking] = useState(initialIsTracking);
  
    const startTimer = () => {
      setIsTracking(true);
    };
  
    const stopTimer = () => {
      setDuration(0);
      setIsTracking(false);
    };

  
    const setInitialDuration = (duration: number) => {
      setDuration(duration);
    };
  
    const setInitialIsTracking = (isTracking: boolean) => {
      setIsTracking(isTracking);
    };
  
    useEffect(() => {
      let interval: number| null = null;
  
      if (isTracking) {
        interval = setInterval(() => {
          setDuration(prevDuration => prevDuration + 1);
        }, 1000);
      }
  
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isTracking]);
  
    return (
      <TimerContext.Provider value={{ duration, isTracking, startTimer, stopTimer, setInitialDuration, setInitialIsTracking }}>
        {children}
      </TimerContext.Provider>
    );
  };
  
  export const useTimerContext = () => {
    const context = useContext(TimerContext);
    if (!context) {
      throw new Error('useTimerContext must be used within a TimerProvider');
    }
    return context;
  };
