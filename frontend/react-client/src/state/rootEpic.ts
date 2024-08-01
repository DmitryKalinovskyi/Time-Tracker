import {combineEpics} from "redux-observable";
import {fetchHelloEpic} from "./hello/epics.ts";
import {loginUserEpic} from "./auth/epics.ts";

export const rootEpic = combineEpics(
    loginUserEpic,
    fetchHelloEpic
)