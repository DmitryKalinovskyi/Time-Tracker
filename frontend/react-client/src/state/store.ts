import {createEpicMiddleware} from "redux-observable";
import {configureStore, Tuple} from "@reduxjs/toolkit";
import {rootEpic} from "./epics/rootEpic.ts";
import helloReducer from "./slices/helloSlice.ts";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        hello: helloReducer
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;