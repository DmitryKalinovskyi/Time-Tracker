import {combineEpics, Epic} from "redux-observable";
import {startSessionEpic} from "@time-tracker/pages/time-tracker/api/epics/startSessionEpic.ts";
import {stopSessionEpic} from "@time-tracker/pages/time-tracker/api/epics/stopSessionEpic.ts";
import {deleteWorkSessionEpic} from "@time-tracker/pages/time-tracker/api/epics/deleteWorkSessionEpic.ts";
import {getCurrentWorkSessionEpic} from "@time-tracker/pages/time-tracker/api/epics/getCurrentWorkSessionEpic.ts";
import {getWorkSessionsEpic} from "@time-tracker/pages/time-tracker/api/epics/getWorkSessionsEpic.ts";
import {getTodayTotalDurationEpic} from "@time-tracker/pages/time-tracker/api/epics/getTodayTotalDurationEpic.ts";
import {updateWorkSessionEpic} from "@time-tracker/pages/time-tracker/api/epics/updateWorkSessionEpic.ts";
import {addWorkSessionEpic} from "@time-tracker/pages/time-tracker/api/epics/addWorkSessionEpic.ts";
import {Action} from "@reduxjs/toolkit";
import {RootState} from "@time-tracker/app/store.ts";

export const timeTrackingEpics: Epic<Action, Action, RootState> = combineEpics(
    startSessionEpic,
    stopSessionEpic,
    deleteWorkSessionEpic,
    getCurrentWorkSessionEpic,
    getWorkSessionsEpic,
    getTodayTotalDurationEpic,
    updateWorkSessionEpic,
    addWorkSessionEpic
);
