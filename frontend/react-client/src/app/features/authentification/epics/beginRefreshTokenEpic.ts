
import {delay, mergeMap, Observable, of, tap} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType, StateObservable} from "redux-observable";
import {RootState} from "../../../store.ts";
import {beginRefreshToken, loginSuccess, refreshToken} from "@time-tracker/features/authentification/authSlice.ts";

const getAccessTokenRefreshDelay = (dateExpires: string) => {
    return new Date(dateExpires) - new Date() - 60 * 1000;
}

/*
Strategy of epic:
    When user retrieve new accessToken (refreshToken and loginSuccess action),
 invoke beginRefreshToken action after delay (1 minute before).
 */
export const beginRefreshTokenEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(refreshToken.type, loginSuccess.type),
    mergeMap(() => of(beginRefreshToken()).pipe(
        delay(getAccessTokenRefreshDelay(state$.value.auth.accessToken.dateExpires)),
        tap(() => console.log('Access token expired. We need to make request with our refresh to receive new access.')),
    ))
)