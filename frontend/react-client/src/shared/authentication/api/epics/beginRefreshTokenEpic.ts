import {delay, Observable, of, switchMap, tap} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {Epic, ofType, StateObservable} from "redux-observable";
import {loginSuccess, refreshToken} from "@time-tracker/shared/authentication/authSlice.ts";
import {RootState} from "@time-tracker/app/store.ts";

const getAccessTokenRefreshDelay = (dateExpires: string) => {
    return new Date(dateExpires) - new Date() - 60 * 1000;
}

/*
Strategy of epic:
    When user retrieve new accessToken (refreshToken and loginSuccess action),
 invoke beginRefreshToken action after delay (1 minute before).
 */
export const beginRefreshTokenEpic: Epic<Action, Action, RootState> = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(refreshToken.type, loginSuccess.type),
    switchMap((action) => of(action).pipe(
            delay(getAccessTokenRefreshDelay(state$.value.auth.accessToken.dateExpires)),
            tap(() => console.log('Access token expired. We need to make request with our refresh to receive new access.')),
        ) as Observable<Action>
    )
)