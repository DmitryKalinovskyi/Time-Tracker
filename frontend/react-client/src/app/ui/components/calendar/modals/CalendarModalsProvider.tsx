import {DayModal} from "./DayModal.tsx";
import {CreateEventDialog} from "./CreateEventDialog.tsx";
import React, {createContext, useState} from "react";
import {CalendarEvent} from "../../../../types/CalendarEvent.ts";
import {UpdateEventDialog} from "./UpdateEventDialog.tsx";

interface CalendarModalsContextType{
    openDayModal: (day: Date) => void
}
export const CalendarModalsContext = createContext<CalendarModalsContextType>({
       openDayModal: () => {}
});

interface CalendarModalsProviderProps{
    children: React.ReactElement[]
}

export function CalendarModalsProvider(props: CalendarModalsProviderProps){
    const [day, setDay] = useState<Date | null>();
    const [calendarEvent, setCalendarEvent] = useState<CalendarEvent | null>(null)
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
    const [isCreateCalendarEventDialogOpen, setIsCreateCalendarEventDialogOpen] = useState(false);
    const [isUpdateCalendarEventDialogOpen, setIsUpdateCalendarEventDialogOpen] = useState(false);
    const openDayModal = (day: Date) => {
        setDay(day);
        setIsDayModalOpen(true);
    };

    const handleCreateCalendarEvent = () => {
        setIsDayModalOpen(false);
        setIsCreateCalendarEventDialogOpen(true);
    }

    const handleUpdateCalendarEvent = (calendarEvent: CalendarEvent) => {
        setIsDayModalOpen(false)
        setCalendarEvent(calendarEvent);
        setIsUpdateCalendarEventDialogOpen(true);
    }

    const handleDayModalClose = () => {
        setIsDayModalOpen(false);
    }

    const handleCreateCalendarEventDialogClose = () => {
        setIsCreateCalendarEventDialogOpen(false);
        setIsDayModalOpen(true);
    }

    const handleUpdateCalendarEventDialogClose = () => {
        setIsUpdateCalendarEventDialogOpen(false);
        setIsDayModalOpen(true);
    }

    return <>
        {day && <DayModal isOpen={isDayModalOpen}
                          day={day}
                          onClose={handleDayModalClose}
                          onUpdateEvent={handleUpdateCalendarEvent}
                          onCreateEvent={handleCreateCalendarEvent}/>}

        {day && <CreateEventDialog isOpen={isCreateCalendarEventDialogOpen}
                           day={day}
                           onClose={handleCreateCalendarEventDialogClose}/>}

        {calendarEvent && <UpdateEventDialog calendarEvent={calendarEvent}
                                             key={calendarEvent.id}
                                             isOpen={isUpdateCalendarEventDialogOpen}
                                             onClose={handleUpdateCalendarEventDialogClose}/>}

        <CalendarModalsContext.Provider value={{openDayModal}}>
            {props.children}
        </CalendarModalsContext.Provider>
    </>
}