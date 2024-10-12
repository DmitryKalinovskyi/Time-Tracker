import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {delay, interval, of} from "rxjs";
import dayjs from "dayjs";

/*
Hook returns seconds elapsed from session start and isTracking
 */
export const useTimer = () => {
    const currentWorkSession = useSelector((state: RootState) => state.timeTracker.currentWorkSession);

    const isTracking = currentWorkSession != null;

    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const observable = interval(1000)
        let subscription = null;

        if (isTracking) {
            const timeElapsedFromStart = Math.floor((new Date() - new Date(currentWorkSession.startTime)) / 1000);
            console.log("Actual time: " + dayjs(new Date()).format("HH:mm:ss:SSS"));
            console.log("Start time of session: " + dayjs(currentWorkSession.startTime).format("HH:mm:ss:SSS"));
            console.log(timeElapsedFromStart);
            setDuration(timeElapsedFromStart);
            console.log("Difference not floored: " + (new Date() - new Date(currentWorkSession.startTime)));
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
    }, [currentWorkSession]);

    return {duration, isTracking};
};