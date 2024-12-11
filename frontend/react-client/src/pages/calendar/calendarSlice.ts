import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CalendarEvent} from "../../types/CalendarEvent.ts";
import User from "../../types/User.ts";

export interface MonthType{
    year:number,
    month: number
}

export interface CalendarStateType{
    selectedUser: User | null,
    selectedMonth: MonthType,
    isFetching: boolean
}

const initialState: CalendarStateType = {
    selectedUser: null,
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    },
    isFetching: false
}

export interface AddCalendarEventInputType {
    startTime: Date,
    endTime: Date
}

export interface UpdateCalendarEventInputType{
    startTime: Date,
    endTime: Date,
    id: number
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        apiCreateCalendarEvent : (state, action: PayloadAction<AddCalendarEventInputType>) => {
        },
        apiUpdateCalendarEvent : (state, action: PayloadAction<UpdateCalendarEventInputType>) => {
        },
        apiDeleteCalendarEvent : (state, action: PayloadAction<number>) => {
        },
        addCalendarEvent : (state, action: PayloadAction<CalendarEvent>) => {
            state.selectedUser!.calendarEvents.push(action.payload);
        },
        removeCalendarEvent: (state, action: PayloadAction<number>) => {
            state.selectedUser!.calendarEvents = state.selectedUser!.calendarEvents
                .filter(e => e.id != action.payload);
        },
        updateCalendarEvent: (state, action: PayloadAction<CalendarEvent>) => {
            state.selectedUser!.calendarEvents = state.selectedUser!.calendarEvents
                .filter(e => e.id != action.payload.id);
            state.selectedUser!.calendarEvents.push(action.payload);
        },
        fetchAndSetSelectedUser: (state, _action: PayloadAction<number>) => {
            state.isFetchingSelectedUser = true;
        },
        setSelectedUser : (state, action: PayloadAction<User>) => {
            state.selectedUser = action.payload;
            state.isFetchingSelectedUser = false;
        },
        changeSelectedMonth : (state, action: PayloadAction<MonthType>) => {
            state.selectedMonth = action.payload;
        }
    }
})

export const {
    apiCreateCalendarEvent,
    apiUpdateCalendarEvent,
    apiDeleteCalendarEvent,
    addCalendarEvent,
    updateCalendarEvent,
    removeCalendarEvent,
    fetchAndSetSelectedUser,
    setSelectedUser,
    changeSelectedMonth
} = calendarSlice.actions;

export default calendarSlice.reducer;