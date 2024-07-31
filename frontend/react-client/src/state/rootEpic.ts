import {combineEpics} from "redux-observable";
import {fetchHelloEpic} from "./hello/epics.ts";

export const rootEpic = combineEpics(
    fetchHelloEpic
)