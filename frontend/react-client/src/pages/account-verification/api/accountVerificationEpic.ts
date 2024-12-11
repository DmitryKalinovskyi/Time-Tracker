import {combineEpics, Epic} from "redux-observable";
import {verifyUserEpic} from "@time-tracker/pages/account-verification/api/epics/verifyUserEpic.ts";
import {Action} from "@reduxjs/toolkit";

export const accountVerificationEpic: Epic<Action, Action> = combineEpics<Action, Action>(
    verifyUserEpic
)