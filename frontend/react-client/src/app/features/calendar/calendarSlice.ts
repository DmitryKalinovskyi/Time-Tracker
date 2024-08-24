import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CalendarEvent} from "../../types/CalendarEvent.ts";

interface CalendarStateType{
    events: CalendarEvent[]
}

const initialState: CalendarStateType = {
    events: []
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        addCalendarEvent : (state, action: PayloadAction<CalendarEvent>) => {
            state.events.push(action.payload);
        },
    }
})

export const {addCalendarEvent} = calendarSlice.actions;

export default calendarSlice.reducer;