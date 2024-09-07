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
        addEvent : (state, action: PayloadAction<CalendarEvent>) => {
            state.selectedUser.calendarEvents.push(action.payload);
        },
        removeEvent: (state, action: PayloadAction<number>) => {
            state.selectedUser.calendarEvents = state.filter(e => e.id != action.payload);
        },
        changeSelectedUser : (state, action: PayloadAction<User>) => {
            state.selectedUser = action.payload;
        }
    }
})

export const {
    addEvent,
    removeEvent,
    changeSelectedUser
} = calendarSlice.actions;

export default calendarSlice.reducer;