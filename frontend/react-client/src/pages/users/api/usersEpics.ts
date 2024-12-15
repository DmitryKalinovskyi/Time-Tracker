import {Action} from "@reduxjs/toolkit";
import {combineEpics, Epic} from "redux-observable";
import {RootState} from "@time-tracker/app/store.ts";
import {getUsersEpic} from "@time-tracker/pages/users/api/epics/getUsersEpic.ts";


export const usersEpics: Epic<Action, Action, RootState> = combineEpics(
    getUsersEpic
)