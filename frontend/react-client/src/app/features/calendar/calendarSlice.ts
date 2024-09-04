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
        addEvent : (state, action: PayloadAction<CalendarEvent>) => {
            state.daysOff.push(action.payload);
        },
        removeEvent: (state, action: PayloadAction<number>) => {
            state.daysOff = state.filter(e => e.id != action.payload);
        }
    }
})

export const {addEvent, removeEvent} = calendarSlice.actions;

export default calendarSlice.reducer;