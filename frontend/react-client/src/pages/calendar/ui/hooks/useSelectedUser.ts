import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@time-tracker/app/store.ts";
import {setSelectedUser} from "@time-tracker/pages/calendar/calendarSlice.ts";
import useAuth from "@time-tracker/shared/authentication/hooks/useAuth.ts";

export function useSelectedUser(){
    const selectedUser = useSelector((state: RootState) => state.calendar.selectedUser);
    const me = useAuth().user;
    const dispatch = useDispatch();
    const selectedUserIsMe = me?.id == selectedUser?.id && me != null;

    const selectMe = () => {
        if(me)
            dispatch(setSelectedUser(me.id));
    }

    const selectUser = (userId: number) => {
        dispatch(setSelectedUser(userId))
    }


    return {selectedUser, selectMe, selectUser, selectedUserIsMe}
}