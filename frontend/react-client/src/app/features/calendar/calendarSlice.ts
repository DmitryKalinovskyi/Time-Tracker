import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CalendarEvent} from "../../types/CalendarEvent.ts";
import User from "../../types/User.ts";

interface CalendarStateType{
    selectedUser: User | null
}

const initialState: CalendarStateType = {
    selectedUser: null
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        addCalendarEvent : (state, action: PayloadAction<CalendarEvent>) => {
            state.selectedUser.calendarEvents.push(action.payload);
        },
        removeCalendarEvent: (state, action: PayloadAction<number>) => {
            state.selectedUser.calendarEvents = state.selectedUser.calendarEvents
                .filter(e => e.id != action.payload);
        },
        updateCalendarEvent: (state, action: PayloadAction<CalendarEvent>) => {
            state.selectedUser.calendarEvents = state.selectedUser.calendarEvents
                .filter(e => e.id != action.payload);
            state.selectedUser.calendarEvents.push(action.payload);
        },
        changeSelectedUser : (state, action: PayloadAction<User>) => {
            state.selectedUser = action.payload;
        }
    }
})

export const {
    addCalendarEvent,
    updateCalendarEvent,
    removeCalendarEvent,
    changeSelectedUser
} = calendarSlice.actions;

export default calendarSlice.reducer;