import {ofType, StateObservable} from "redux-observable";
import {map, from, catchError, of, mergeMap, Observable, tap, filter, concat, delay} from "rxjs";
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
import {isTokenExpired} from "../../misc/tokenValidation.ts";
import {getAvailableRefreshToken, saveRefreshToken} from "./refreshTokenManager.ts";
import {InvalidCredentialsExecutionError} from "./errors/InvalidCredentialsExecutionError.ts";
import {InvalidRefreshTokenExecutionError} from "./errors/InvalidRefreshTokenExecutionError.ts";

export const beginRefreshTokenEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    filter(() => {
        const auth = state$.value.auth;
        if(auth.accessToken != null && !isTokenExpired(auth.accessToken)){
            // we already have valid access token.
            return false;
        }

        if(auth.isRefreshing)
            return false;

        if(auth.refreshRejects >= 5){
            console.log("Too many refreshes. Refresh will not be completed.");
            return false;
        }

        const token = getAvailableRefreshToken();
        if(token == null)
            return false;

        return true;
    }),
    tap(() => console.log('Access token expired. We need to make request with our refresh to receive new access.')),
    mergeMap((action) => {
        // action will be dispatched again to the store, this can lead to some issues
       return concat(of(beginRefreshToken()), of(action));
    }),
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

