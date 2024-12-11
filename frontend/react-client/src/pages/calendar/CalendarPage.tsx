import {CalendarViewByMonth} from "./ui/CalendarViewByMonth.tsx";
import {CalendarModalsProvider} from "./ui/modals/CalendarModalsProvider.tsx";

export function CalendarPage(){
    return <>
        <CalendarModalsProvider>
            <CalendarViewByMonth/>
        </CalendarModalsProvider>
    </>
}