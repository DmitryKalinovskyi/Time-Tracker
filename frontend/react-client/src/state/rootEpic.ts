import {combineEpics} from "redux-observable";
import {fetchHelloEpic} from "./hello/epics.ts";
import { createUserEpic } from './user/createUserEpic.ts';
import {verifyUserEpic} from "./user/verifyUserEpic.ts";

export const rootEpic = combineEpics(
    fetchHelloEpic,
    createUserEpic,
    verifyUserEpic
)