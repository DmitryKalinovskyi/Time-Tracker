import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import { Action, configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import authReducer from "./features/authentification/authSlice.ts";
import userReducer from "./features/user/userSlice.ts";
import { authUserEpic } from "./features/authentification/epics.ts";
import { createUserEpic } from "./features/user/createUserEpic.ts";
import { verifyUserEpic } from "./features/user/verifyUserEpic.ts";

const rootEpic: Epic<Action, Action, RootState, AppDispatch> = combineEpics(
    authUserEpic,
    createUserEpic,
    verifyUserEpic
);

const epicMiddleware = createEpicMiddleware<Action, Action, RootState, AppDispatch>();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(epicMiddleware)
});

epicMiddleware.run(rootEpic);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
