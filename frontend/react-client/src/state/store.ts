import {createEpicMiddleware} from "redux-observable";
import {configureStore, Tuple} from "@reduxjs/toolkit";
import {rootEpic} from "./rootEpic.ts";
import userReducer from './user/userSlice';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;