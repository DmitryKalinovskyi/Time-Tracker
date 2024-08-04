import {combineEpics} from "redux-observable";
import { createUserEpic } from './user/createUserEpic.ts';
import {verifyUserEpic} from "./user/verifyUserEpic.ts";

export const rootEpic = combineEpics(
    createUserEpic,
    verifyUserEpic
)