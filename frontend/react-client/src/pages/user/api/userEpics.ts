import {combineEpics, Epic} from "redux-observable";
import {getUserEpic} from "@time-tracker/pages/user/api/epics/getUserEpic.ts";
import {updateUserEpic} from "@time-tracker/pages/user/api/epics/updateUserEpic.ts";
import {updateUserPermissionsEpic} from "@time-tracker/pages/user/api/epics/updateUserPermissionsEpic.ts";
import {updateUserActiveStatusEpic} from "@time-tracker/pages/user/api/epics/updateUserActiveStatusEpic.ts";
import {Action} from "@reduxjs/toolkit";
import {RootState} from "@time-tracker/app/store.ts";

export const userEpics: Epic<Action, Action, RootState> = combineEpics(
    getUserEpic,
    updateUserEpic,
    updateUserPermissionsEpic,
    updateUserActiveStatusEpic
)