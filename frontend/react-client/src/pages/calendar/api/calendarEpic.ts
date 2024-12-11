import {combineEpics, Epic} from "redux-observable";
import {createCalendarEventEpic} from "./epics/createCalendarEventEpic.ts"
import {updateCalendarEventEpic} from "./epics/updateCalendarEventEpic.ts"
import {deleteCalendarEventEpic} from "./epics/deleteCalendarEventEpic.ts";
import {fetchAndSetSelectedUserEpic} from "./epics/fetchAndSetSelectedUserEpic.ts";
import {Action} from "@reduxjs/toolkit";
export const calendarEpic: Epic<Action, Action> = combineEpics(
    createCalendarEventEpic,
    updateCalendarEventEpic,
    deleteCalendarEventEpic,
    fetchAndSetSelectedUserEpic
);