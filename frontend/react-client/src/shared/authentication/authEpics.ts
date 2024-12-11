import {combineEpics} from "redux-observable";
import {authUserEpic} from "@time-tracker/shared/authentication/epics/authUserEpic.ts";
import {beginRefreshTokenEpic} from "@time-tracker/shared/authentication/epics/beginRefreshTokenEpic.ts";
import {refreshTokenEpic} from "@time-tracker/shared/authentication/epics/refreshTokenEpic.ts";

export const authEpics = combineEpics(
    authUserEpic,
    beginRefreshTokenEpic,
    refreshTokenEpic
)