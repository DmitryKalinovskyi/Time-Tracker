import {combineEpics} from "redux-observable";
import {startSessionEpic} from "./epics/startSessionEpic.ts";
import {stopSessionEpic} from "./epics/stopSessionEpic.ts";
import {deleteWorkSessionEpic} from "./epics/deleteWorkSessionEpic.ts";
import {getCurrentWorkSessionEpic} from "./epics/getCurrentWorkSessionEpic.ts";
import {getWorkSessionsEpic} from "./epics/getWorkSessionsEpic.ts";
import {getTodayTotalDurationEpic} from "./epics/getTodayTotalDurationEpic.ts";
import {updateWorkSessionEpic} from "./epics/updateWorkSessionEpic.ts";

export const timeTrackingEpics = combineEpics(
    startSessionEpic,
    stopSessionEpic,
    deleteWorkSessionEpic,
    getCurrentWorkSessionEpic,
    getWorkSessionsEpic,
    getTodayTotalDurationEpic,
    updateWorkSessionEpic
);
