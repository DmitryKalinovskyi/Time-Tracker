import {CalendarViewByMonth} from "../components/calendar/CalendarViewByMonth.tsx";
import {CalendarModalsProvider} from "../components/calendar/modals/CalendarModalsProvider.tsx";

export function CalendarPage(){
    return <>
        <CalendarModalsProvider>
            <CalendarViewByMonth/>
        </CalendarModalsProvider>
    </>
}