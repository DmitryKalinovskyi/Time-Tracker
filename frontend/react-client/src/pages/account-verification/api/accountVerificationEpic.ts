import {combineEpics, Epic} from "redux-observable";
import {verifyUserEpic} from "@time-tracker/pages/account-verification/api/epics/verifyUserEpic.ts";
import {Action} from "@reduxjs/toolkit";
import {RootState} from "@time-tracker/app/store.ts";

export const accountVerificationEpic: Epic<Action, Action, RootState> = combineEpics<Action, Action, RootState>(
    verifyUserEpic
)