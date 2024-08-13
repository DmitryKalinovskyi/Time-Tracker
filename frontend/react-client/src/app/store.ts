import {combineEpics, createEpicMiddleware, Epic} from "redux-observable";
import {Action, configureStore, Tuple} from "@reduxjs/toolkit";

import authReducer from "./features/authentification/authSlice.ts";
import regReducer from "./features/registration/regSlice.ts";
import verifReducer  from "./features/verification/verifSlice.ts";
import usersReducer from "./features/users/usersSlice.ts";
import userReducer from "./features/user/userSlice.ts";
import permissionsReducer from "./features/permissions/permissionsSlice.ts";

import { authUserEpic } from "./features/authentification/authEpics.ts";
import { useDispatch, useSelector } from "react-redux";
import { regUserEpic } from "./features/registration/regEpics.ts";
import { verifUserEpic } from "./features/verification/verifEpics.ts";
import { getUsersEpic } from "./features/users/usersEpics.ts";
import { getUserEpic, updateUserActiveStatusEpic, updateUserEpic, updateUserPermissionsEpic } from "./features/user/userEpics.ts";
import { getPermissionsEpic } from "./features/permissions/permissionsEpics.ts";



const rootEpic: Epic<Action, Action, void, any> = combineEpics<Action, Action, void, any>(
    authUserEpic,
    regUserEpic,
    verifUserEpic,
    getUsersEpic,
    getUserEpic,
    updateUserEpic,
    updateUserActiveStatusEpic,
    updateUserPermissionsEpic,
    getPermissionsEpic
  );

const epicMiddleware = createEpicMiddleware<Action, Action, void, any>();


export const store = configureStore({
    reducer: {
        auth: authReducer,
        reg: regReducer,
        verif: verifReducer,
        users: usersReducer,
        user: userReducer,
        permissions: permissionsReducer
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;