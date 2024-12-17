import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CalendarEvent} from "../../types/CalendarEvent.ts";
import User from "../../types/User.ts";
import {ShowFailure, ShowSuccess} from "@time-tracker/shared/misc/SnackBarHelper.ts";

export interface MonthType{
    year:number,
    month: number
}

export interface CalendarStateType{
    selectedUser: User | null,
    selectedMonth: MonthType,
}

const initialState: CalendarStateType = {
    selectedUser: null,
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    },
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
        createCalendarEvent : (state, action: PayloadAction<AddCalendarEventInputType>) => {
        },
        createCalendarEventSuccess : (state, action: PayloadAction<CalendarEvent>) => {
            state.selectedUser!.calendarEvents.push(action.payload);
            ShowSuccess("Work time added.")
        },
        createCalendarEventFailure : () => {
            ShowFailure("An error occurred while trying to add the calendar event.");
        },

        updateCalendarEvent : (state, action: PayloadAction<UpdateCalendarEventInputType>) => {
        },
        updateCalendarEventSuccess: (state, action: PayloadAction<CalendarEvent>) => {
            state.selectedUser!.calendarEvents = state.selectedUser!.calendarEvents
                .filter(e => e.id != action.payload.id);
            state.selectedUser!.calendarEvents.push(action.payload);
            ShowSuccess("Work time updated.")
        },
        updateCalendarEventFailure: () => {
            ShowFailure("Error while trying to add calendar event.");
        },

        deleteCalendarEvent : (state, action: PayloadAction<number>) => {
        },

        deleteCalendarEventSuccess: (state, action: PayloadAction<number>) => {
            state.selectedUser!.calendarEvents = state.selectedUser!.calendarEvents
                .filter(e => e.id != action.payload);
            ShowSuccess("Work time removed.")
        },
        deleteCalendarEventFailure: () => {
            ShowFailure("Error when trying to remove calendar event.");
        },


        setSelectedUser: (state, action: PayloadAction<number>) => {
        },
        setSelectedUserSuccess : (state, action: PayloadAction<User>) => {
            state.selectedUser = action.payload;
        },
        setSelectedUserFailure : () => {
            ShowFailure("Error while fetching user calendar.");
        },

        setCalendarMonth : (state, action: PayloadAction<MonthType>) => {
            state.selectedMonth = action.payload;
        },
        moveToNextMonth: (state) => {
            state.selectedMonth = {
                year: state.selectedMonth.year + (state.selectedMonth.month == 11 ? 1: 0),
                month: ((state.selectedMonth.month + 1) % 12)
            }
        },
        moveToPreviousMonth: (state) => {
            state.selectedMonth = {
                year: state.selectedMonth.year + (state.selectedMonth.month == 0 ? -1: 0),
                month: ((state.selectedMonth.month+11) % 12)
            };
        },
        setActualMonth: (state) => {
            state.selectedMonth = {
                year: new Date().getFullYear(),
                month: new Date().getMonth()
            };
        }
    }
})

export const {
    createCalendarEvent,
    createCalendarEventSuccess,
    createCalendarEventFailure,

    updateCalendarEvent,
    updateCalendarEventSuccess,
    updateCalendarEventFailure,

    deleteCalendarEvent,
    deleteCalendarEventSuccess,
    deleteCalendarEventFailure,

    setSelectedUser,
    setSelectedUserSuccess,
    setSelectedUserFailure,

    setCalendarMonth,
    moveToPreviousMonth,
    moveToNextMonth,
    setActualMonth

} = calendarSlice.actions;

export default calendarSlice.reducer;