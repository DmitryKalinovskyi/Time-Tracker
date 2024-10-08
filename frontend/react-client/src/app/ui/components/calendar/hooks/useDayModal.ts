import {useContext} from "react";
import {CalendarModalsContext} from "../modals/CalendarModalsProvider.tsx";

export function useDayModal(){
    const {openDayModal} = useContext(CalendarModalsContext);

    return openDayModal;
}