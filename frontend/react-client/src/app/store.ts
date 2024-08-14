import {combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import {Action, configureStore, Tuple} from "@reduxjs/toolkit";

import authReducer from "./features/authentification/authSlice.ts";
import regReducer from "./features/registration/regSlice.ts";
import verifReducer  from "./features/verification/verifSlice.ts";
import resetReducer  from "./features/resetPassword/resetSlice.ts";
import timeTrackerReducer from './features/timeTracking/timeTrackingSlice.ts';

import { authUserEpic } from "./features/authentification/authEpics.ts";
import { useDispatch, useSelector } from "react-redux";
import { regUserEpic } from "./features/registration/regEpics.ts";
import { verifUserEpic } from "./features/verification/verifEpics.ts";
import { resetUserPasswordEpic } from "./features/resetPassword/resetEpic.ts";
import { addSessionEpic, deleteSessionEpic, getSessionsEpic, startSessionEpic, stopSessionEpic, updateSessionEpic } from "./features/timeTracking/timeTrackingEpics.ts";



const rootEpic: Epic<Action, Action, any, any> = combineEpics<Action, Action, any, any>(
    authUserEpic,
    regUserEpic,
    verifUserEpic,
    resetUserPasswordEpic,
    startSessionEpic,
    stopSessionEpic,
    getSessionsEpic,
    updateSessionEpic,
    deleteSessionEpic,
    addSessionEpic
  );

const epicMiddleware = createEpicMiddleware<Action, Action, any, any>();


export const store = configureStore({
    reducer: {
        auth: authReducer,
        reg: regReducer,
        verif: verifReducer,
        reset: resetReducer,
        timeTracker: timeTrackerReducer
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;