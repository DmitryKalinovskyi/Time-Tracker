import {CalendarEvent} from "./CalendarEvent.ts";

interface User {
    id: number,
    fullName: string,
    email: string,
    permissions: string[],
    isActive: boolean,
    calendarEvents: CalendarEvent[]
}

export default User;