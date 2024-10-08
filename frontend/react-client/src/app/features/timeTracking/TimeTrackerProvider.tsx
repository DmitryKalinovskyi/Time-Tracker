import {ReactElement, useEffect} from "react";
import {useDispatch} from "react-redux";
import {getCurrentWorkSession} from "./timeTrackingSlice.ts";
import useAuth from "../../hooks/useAuth.ts";

interface TimeTrackerProviderProps{
    children?: ReactElement[]
}

export function TimeTrackerProvider(props: TimeTrackerProviderProps){
    const dispatch  = useDispatch();
    const auth = useAuth();
    useEffect(() => {
        if(auth.user){
            dispatch(getCurrentWorkSession(auth.user.id))
        }
    }, [dispatch, auth]);

    return <>{props.children}</>
}
