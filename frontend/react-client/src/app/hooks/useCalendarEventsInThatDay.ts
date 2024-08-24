import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {isSameDay} from "../misc/DateHelper.ts";

export default function useCalendarEventsInThatDay(day: Date){
    const calendar = useSelector((state: RootState) => state.calendar);

    return calendar.events.filter(e => isSameDay(day, e.day));
}