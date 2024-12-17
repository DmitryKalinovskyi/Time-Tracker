import {combineEpics, Epic} from "redux-observable";
import {createCalendarEventEpic} from "./epics/createCalendarEventEpic.ts"
import {updateCalendarEventEpic} from "./epics/updateCalendarEventEpic.ts"
import {deleteCalendarEventEpic} from "./epics/deleteCalendarEventEpic.ts";
import {setSelectedUserEpic} from "./epics/setSelectedUserEpic.ts";
import {Action} from "@reduxjs/toolkit";
import {RootState} from "@time-tracker/app/store.ts";
export const calendarEpic: Epic<Action, Action, RootState> = combineEpics(
    createCalendarEventEpic,
    updateCalendarEventEpic,
    deleteCalendarEventEpic,
    setSelectedUserEpic
);