import {DayModal} from "./DayModal.tsx";
import {CreateEventDialog} from "./CreateEventDialog.tsx";
import React, {createContext, useState} from "react";

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
    const [day, setDay] = useState(new Date());
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const openDayModal = (day: Date) =>{
        setDay(day);
        setIsDayModalOpen(true);
    }

    const switchModalToDialog = () => {
        setIsDayModalOpen(false);
        setIsCreateDialogOpen(true);
    }

    const handleCreateDialogClose = () => {
        setIsCreateDialogOpen(false);
    }

    const handleDayModalClose = () => {
        setIsDayModalOpen(false);
    }

    return <>
        <DayModal isOpen={isDayModalOpen}
                  day={day}
                  onClose={handleDayModalClose}
                  onCreateEvent={switchModalToDialog}
        />

        <CreateEventDialog isOpen={isCreateDialogOpen}
                           day={day}
                           onClose={handleCreateDialogClose}/>
        <CalendarModalsContext.Provider value={{openDayModal}}>
            {props.children}
        </CalendarModalsContext.Provider>
    </>
}