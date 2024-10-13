import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store.ts";
import {concat, delay, interval, map, timer} from "rxjs";

/*
Hook returns seconds elapsed from session start and isTracking
 */
export const useTimer = () => {
    const currentWorkSession = useSelector((state: RootState) => state.timeTracker.currentWorkSession);

    const isTracking = currentWorkSession != null;

    const [duration, setDuration] = useState(0);

    useEffect(() => {
        let subscription = null;

        if (isTracking) {
            const millisecondsElapsedFromStart = new Date() - new Date(currentWorkSession.startTime);
            let timerObservable = null;
            // handle negative case and positive case
            if(millisecondsElapsedFromStart < 0){
                // probably means that server and machine is not in sync with time,
                // we can notify about it and wait until time becomes non-negative
                // console.warn("Probably server time and machine time is not synchronized")
                timerObservable = interval(1000).pipe(delay(Math.abs(millisecondsElapsedFromStart)));
                subscription = timerObservable.subscribe((x) => {
                    setDuration(x + 1);
                })
            }
            else{
                const toWait = 1000 - (millisecondsElapsedFromStart % 1000);
                const seconds = Math.ceil(millisecondsElapsedFromStart/1000);
                setDuration(seconds-1);
                timerObservable = concat(
                    timer(toWait),
                    interval(1000).pipe(
                        map((s) => s+1)
                    )
                );

                subscription = timerObservable.subscribe((x) => {
                    setDuration(seconds + x);
                })
            }


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