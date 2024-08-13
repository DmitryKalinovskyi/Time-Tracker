import {combineEpics, createEpicMiddleware, Epic} from "redux-observable";
import {Action, configureStore, Tuple} from "@reduxjs/toolkit";

import authReducer from "./features/authentification/authSlice.ts";
import regReducer from "./features/registration/regSlice.ts";
import verifReducer  from "./features/verification/verifSlice.ts";
import resetReducer  from "./features/resetPassword/resetSlice.ts";

import {authUserEpic, refreshTokenEpic} from "./features/authentification/authEpics.ts";
import { useDispatch, useSelector } from "react-redux";
import { regUserEpic } from "./features/registration/regEpics.ts";
import { verifUserEpic } from "./features/verification/verifEpics.ts";
import { resetUserPasswordEpic } from "./features/resetPassword/resetEpic.ts";



const rootEpic: Epic<Action, Action, void, any> = combineEpics<Action, Action, void, any>(
    refreshTokenEpic,
    authUserEpic,
    regUserEpic,
    verifUserEpic,
    resetUserPasswordEpic,
  );

const epicMiddleware = createEpicMiddleware<Action, Action, void, any>();


export const store = configureStore({
    reducer: {
        auth: authReducer,
        reg: regReducer,
        verif: verifReducer,
        reset: resetReducer,
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;