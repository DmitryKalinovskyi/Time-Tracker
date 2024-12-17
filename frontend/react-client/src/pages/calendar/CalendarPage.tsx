import {CalendarViewByMonth} from "./ui/CalendarViewByMonth/CalendarViewByMonth.tsx";
import {CalendarModalsProvider} from "./ui/modals/CalendarModalsProvider.tsx";

export function CalendarPage(){
    return <>
        <CalendarModalsProvider>
            <CalendarViewByMonth/>
        </CalendarModalsProvider>
    </>
}