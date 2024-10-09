import {combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import {Action, configureStore, Tuple} from "@reduxjs/toolkit";

import authReducer from "./features/authentification/authSlice.ts";
import registerReducer from "./features/registration/registerSlice.ts";
import verifReducer  from "./features/verification/verifSlice.ts";
import usersReducer from "./features/users/usersSlice.ts";
import userReducer from "./features/user/userSlice.ts";
import permissionsReducer from "./features/permissions/permissionsSlice.ts";
import resetReducer  from "./features/resetPassword/resetSlice.ts";
import timeTrackerReducer from './features/timeTracking/timeTrackingSlice.ts';
import calendarReducer from "./features/calendar/calendarSlice.ts";
import workReportingReducer from "./features/workReporting/workReportingSlice.ts";

import {authUserEpic, beginRefreshTokenEpic, refreshTokenEpic} from "./features/authentification/authEpics.ts";
import { useDispatch, useSelector } from "react-redux";
import { registerUserEpic } from "./features/registration/registerEpics.ts";
import { verifUserEpic } from "./features/verification/verifEpics.ts";
import { resetUserPasswordEpic } from "./features/resetPassword/resetEpic.ts";
import { getUsersEpic } from "./features/users/usersEpics.ts";
import { getUserEpic, updateUserActiveStatusEpic, updateUserEpic, updateUserPermissionsEpic } from "./features/user/userEpics.ts";
import { getPermissionsEpic } from "./features/permissions/permissionsEpics.ts";
import {
    createCalendarEventEpic,
    deleteCalendarEventEpic, fetchAndSetSelectedUserEpic,
    updateCalendarEventEpic
} from "./features/calendar/calendarEpic.ts";
import {fetchWorkReportEpic} from "./features/workReporting/workReportingEpic.ts";
import {timeTrackingEpics} from "./features/timeTracking/timeTrackingEpics.ts";



const rootEpic: Epic<Action, Action, any, any> = combineEpics<Action, Action, any, any>(
    authUserEpic,
    beginRefreshTokenEpic,
    refreshTokenEpic,
    registerUserEpic,
    verifUserEpic,
    getUsersEpic,
    getUserEpic,
    updateUserEpic,
    updateUserActiveStatusEpic,
    updateUserPermissionsEpic,
    getPermissionsEpic,
    resetUserPasswordEpic,

    timeTrackingEpics,

    createCalendarEventEpic,
    updateCalendarEventEpic,
    deleteCalendarEventEpic,
    fetchAndSetSelectedUserEpic,

    fetchWorkReportEpic
  );

const epicMiddleware = createEpicMiddleware<Action, Action, any, any>();


export const store = configureStore({
    reducer: {
        auth: authReducer,
        reg: registerReducer,
        verif: verifReducer,
        users: usersReducer,
        user: userReducer,
        permissions: permissionsReducer,
        reset: resetReducer,
        timeTracker: timeTrackerReducer,
        calendar: calendarReducer,
        workReporting: workReportingReducer
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;