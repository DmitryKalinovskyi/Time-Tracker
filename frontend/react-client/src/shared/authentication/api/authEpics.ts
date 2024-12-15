import {combineEpics, Epic} from "redux-observable";
import {authUserEpic} from "@time-tracker/shared/authentication/api/epics/authUserEpic.ts";
import {beginRefreshTokenEpic} from "@time-tracker/shared/authentication/api/epics/beginRefreshTokenEpic.ts";
import {refreshTokenEpic} from "@time-tracker/shared/authentication/api/epics/refreshTokenEpic.ts";
import {Action} from "@reduxjs/toolkit";
import {RootState} from "@time-tracker/app/store.ts";

export const authEpics: Epic<Action, Action, RootState> = combineEpics(
    authUserEpic,
    beginRefreshTokenEpic,
    refreshTokenEpic
)