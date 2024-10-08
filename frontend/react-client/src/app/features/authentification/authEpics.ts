import {ofType, StateObservable} from "redux-observable";
import {map, from, catchError, of, mergeMap, Observable, tap, delay} from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {
    loginSuccess,
    loginFailure,
    AuthPayload,
    refreshToken,
    refreshTokenReject,
    beginRefreshToken
} from "./authSlice.ts";
import { createRequest } from "../../misc/RequestCreator.ts";
import {loginQuery, LoginQueryResponseType, refreshTokenQuery, RefreshTokenQueryResponseType} from "./api/authQueries.ts"
import { loginUser } from "./authSlice.ts";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../../store.ts"
import {getAvailableRefreshToken, saveRefreshToken} from "./refreshTokenManager.ts";
import {InvalidCredentialsExecutionError} from "./errors/InvalidCredentialsExecutionError.ts";
import {InvalidRefreshTokenExecutionError} from "./errors/InvalidRefreshTokenExecutionError.ts";


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

export const refreshTokenEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(beginRefreshToken.type),
    mergeMap(() => from(
        ajax(createRequest(refreshTokenQuery(),
            {
                input: {
                    refreshToken: getAvailableRefreshToken()?.value,
                }})).pipe(
            map((ajaxResponse: AjaxResponse<RefreshTokenQueryResponseType>) => {
                const errors = ajaxResponse.response.errors;
                if(errors && errors.length > 0){
                    if(errors[0].extensions.code === "INVALID_REFRESH_TOKEN")
                        throw new InvalidRefreshTokenExecutionError(errors[0].message);

                    throw new Error(errors[0].message)
                }

                const refreshTokenQueryResult = ajaxResponse.response.data.identityMutation.refreshToken;
                return refreshToken({
                    user: refreshTokenQueryResult.user,
                    accessToken: refreshTokenQueryResult.accessToken,
                    refreshToken: refreshTokenQueryResult.refreshToken
                });
            }),
            catchError(error => {
                console.log(error);
                return of(refreshTokenReject())
            })
        )
    ))
);

export const authUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(loginUser.type),
    mergeMap((action: PayloadAction<AuthPayload>) =>
        from(
            ajax(createRequest(loginQuery(), {
                input: action.payload
            }))
                .pipe(
                    map((ajaxResponse: AjaxResponse<LoginQueryResponseType>) => {
                        const errors = ajaxResponse.response.errors;

                        if(errors && errors.length > 0){
                            if(errors[0].extensions.code === "INVALID_CREDENTIALS")
                                throw new InvalidCredentialsExecutionError(errors[0].message);

                            throw new Error(errors[0].message)
                        }

                        const loginResult = ajaxResponse.response.data.identityMutation.login;

                        saveRefreshToken(loginResult.refreshToken);

                        return loginSuccess({
                            accessToken: loginResult.accessToken,
                            user: loginResult.user,
                        });
                    }),
                    catchError((error) => {
                        if(error instanceof InvalidCredentialsExecutionError){
                            return of(loginFailure(error.message));
                        }

                        return of(loginFailure('An unexpected error occurred'));
                    })
                )
            )
    )
);

