import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";

/*
Hook returns seconds elapsed from session start and isTracking
 */
export const useTimer = () => {
    const currentWorkSession = useSelector((state: RootState) => state.timeTracker.currentWorkSession);

    const isTracking = currentWorkSession != null;

    const [duration, setDuration] = useState(0);
    useEffect(() => {
        if(currentWorkSession){
            const timeElapsedFromStart = Math.floor((new Date().getTime() - new Date(currentWorkSession.startTime).getTime()) / 1000);
            setDuration(timeElapsedFromStart);
        }
        else{
            setDuration(0);
        }

    }, [currentWorkSession]);

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

    return [duration, isTracking];
};