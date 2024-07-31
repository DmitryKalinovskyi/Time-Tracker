import {createEpicMiddleware} from "redux-observable";
import {configureStore, Tuple} from "@reduxjs/toolkit";
import {rootEpic} from "./rootEpic.ts";
import helloReducer from "./hello/helloSlice.ts";
import authReducer from "./auth/authSlice.ts";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        hello: helloReducer,
        auth: authReducer
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;