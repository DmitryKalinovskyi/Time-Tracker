import {ReactElement, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getCurrentWorkSession, getTodayTotalDuration} from "./timeTrackingSlice.ts";
import useAuth from "../authentification/hooks/useAuth.ts";

interface TimeTrackerProviderProps{
    children?: ReactElement[]
}

export function TimeTrackerProvider(props: TimeTrackerProviderProps){
    const dispatch  = useDispatch();
    const auth = useAuth();
    useEffect(() => {
        if(auth.user){
            dispatch(getCurrentWorkSession(auth.user.id))
            dispatch(getTodayTotalDuration())
        }
    }, [dispatch, auth]);

    return <>{props.children}</>
}
