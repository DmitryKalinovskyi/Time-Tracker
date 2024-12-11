import {combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import {Action, configureStore, Tuple} from "@reduxjs/toolkit";

import authReducer from "@time-tracker/shared/authentication/authSlice.ts";
import registerReducer from "@time-tracker/pages/create-user/registerSlice.ts";
import verifReducer  from "@time-tracker/pages/account-verification/verifSlice.ts";
import usersReducer from "@time-tracker/pages/users/usersSlice.ts";
import userReducer from "@time-tracker/pages/user/userSlice.ts";
import permissionsReducer from "@time-tracker/shared/authorization/permissionsSlice.ts";
import resetReducer  from "@time-tracker/pages/reset-password/resetSlice.ts";
import calendarReducer from "@time-tracker/pages/calendar/calendarSlice.ts";
import timeTrackerReducer from "@time-tracker/pages/time-tracker/timeTrackingSlice.ts";
import workReportingReducer from "@time-tracker/pages/work-reports/workReportingSlice.ts";

import {authEpics} from "@time-tracker/shared/authentication/authEpics.ts";
import { useDispatch, useSelector } from "react-redux";
import { registerUserEpic } from "@time-tracker/pages/create-user/api/registerEpics.ts";
import { verifUserEpic } from "@time-tracker/pages/account-verification/api/verifEpics.ts";
import { resetUserPasswordEpic } from "@time-tracker/pages/reset-password/api/resetEpic.ts";
import { getUsersEpic } from "@time-tracker/pages/users/api/usersEpics.ts";
import { getUserEpic, updateUserActiveStatusEpic, updateUserEpic, updateUserPermissionsEpic } from "@time-tracker/pages/user/api/userEpics.ts";
import { getPermissionsEpic } from "@time-tracker/shared/authorization/permissionsEpics.ts";
import {calendarEpic} from "@time-tracker/pages/calendar/api/calendarEpic.ts";
import {fetchWorkReportEpic} from "@time-tracker/pages/work-reports/api/workReportingEpic.ts";
import {timeTrackingEpics} from "@time-tracker/pages/time-tracker/timeTrackingEpics.ts";



const rootEpic: Epic<Action, Action, any, any> = combineEpics<Action, Action, any, any>(
    authEpics,
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
    calendarEpic,
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