import {combineEpics, Epic} from "redux-observable";
import {Action} from "@reduxjs/toolkit";
import {RootState} from "@time-tracker/app/store.ts";
import {fetchWorkReportEpic} from "./epics/fetchWorkReportEpic.ts";

export const workReportsEpics: Epic<Action, Action, RootState> = combineEpics(
    fetchWorkReportEpic
)