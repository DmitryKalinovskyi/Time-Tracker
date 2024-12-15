import {combineEpics, createEpicMiddleware, Epic} from "redux-observable";
import {Action, configureStore, Tuple} from "@reduxjs/toolkit";

import {authEpics} from "@time-tracker/shared/authentication/api/authEpics.ts";
import {useDispatch, useSelector} from "react-redux";
import {timeTrackingEpics} from "@time-tracker/pages/time-tracker/api/timeTrackingEpics.ts";
import {accountVerificationEpic, verifyReducer} from "@time-tracker/pages/account-verification";
import {calendarEpic, calendarReducer} from "@time-tracker/pages/calendar";
import {createUserEpic, createUserReducer} from "@time-tracker/pages/create-user";
import {resetPasswordEpic, resetPasswordReducer} from "@time-tracker/pages/reset-password";
import {userEpics, userReducer} from "@time-tracker/pages/user";
import {usersEpics, usersReducer} from "@time-tracker/pages/users";
import {timeTrackingReducer} from "@time-tracker/pages/time-tracker";
import {workReportingReducer, workReportsEpics} from "@time-tracker/pages/work-reports";
import {getPermissionsEpic, permissionsReducer} from "@time-tracker/shared/authorization";
import {authReducer} from "@time-tracker/shared/authentication";


const rootEpic: Epic<Action, Action, RootState> = combineEpics<Action, Action, RootState>(
    authEpics,
    getPermissionsEpic,

    accountVerificationEpic,
    createUserEpic,
    resetPasswordEpic,

    timeTrackingEpics,

    userEpics,
    usersEpics,
    calendarEpic,
    workReportsEpics
  );

const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();


export const store = configureStore({
    reducer: {
        auth: authReducer,
        createUser: createUserReducer,
        verify: verifyReducer,
        users: usersReducer,
        user: userReducer,
        permissions: permissionsReducer,
        resetPassword: resetPasswordReducer,
        timeTracker: timeTrackingReducer,
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