import {combineEpics} from "redux-observable";
import {authUserEpic} from "@time-tracker/features/authentification/epics/authUserEpic.ts";
import {beginRefreshTokenEpic} from "@time-tracker/features/authentification/epics/beginRefreshTokenEpic.ts";
import {refreshTokenEpic} from "@time-tracker/features/authentification/epics/refreshTokenEpic.ts";

export const authEpics = combineEpics(
    authUserEpic,
    beginRefreshTokenEpic,
    refreshTokenEpic
)