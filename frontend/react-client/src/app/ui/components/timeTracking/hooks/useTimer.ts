import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {interval} from "rxjs";

/*
Hook returns seconds elapsed from session start and isTracking
 */
export const useTimer = () => {
    const currentWorkSession = useSelector((state: RootState) => state.timeTracker.currentWorkSession);

    const isTracking = currentWorkSession != null;

    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const observable = interval(1000);
        let subscription = null;

        if (isTracking) {
            const timeElapsedFromStart = Math.floor((new Date().getTime() - new Date(currentWorkSession.startTime+"+00:00").getTime()) / 1000);

            setDuration(timeElapsedFromStart);
            subscription = observable.subscribe((x) => {
                setDuration(timeElapsedFromStart + x + 1);
            })
        }
        else{
            setDuration(0);
        }

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [isTracking, currentWorkSession]);

    return {duration, isTracking};
};