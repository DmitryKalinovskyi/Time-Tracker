import {ofType, StateObservable} from "redux-observable";
import {map, from, catchError, of, mergeMap, Observable, tap, filter, concat, delay} from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {loginSuccess, loginFailure, AuthPayload, refreshToken, refreshTokenReject} from "./authSlice.ts";
import { createRequest } from "../../misc/RequestCreator.ts";
import {loginQuery, LoginQueryResponseType, refreshTokenQuery, RefreshTokenQueryResponseType} from "./api/authQueries.ts"
import { loginUser } from "./authSlice.ts";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import {RootState} from "../../store.ts"
import {isTokenExpired} from "../../misc/tokenValidation.ts";
import {getAvailableRefreshToken, saveRefreshToken} from "./refreshTokenManager.ts";

export const refreshTokenEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    filter(() => {
        const auth = state$.value.auth;
        if(auth.accessToken != null && !isTokenExpired(auth.accessToken)){
            // we already have valid access token.
            return false;
        }

        if(auth.refreshRejects >= 5){
            console.log("Too many refreshes. Refresh will not be completed.");
            return false;
        }

        const token = getAvailableRefreshToken();
        if(token == null)
            return false;

        return true;
    }),
    delay(1000),
    tap(() => console.log('Access token expired. We need to make request with our refresh to receive new access.')),
    mergeMap((action) => from(
        ajax(createRequest(refreshTokenQuery(),
            {
                input: {
                    refreshToken: getAvailableRefreshToken()?.value,
                }})).pipe(
            map((ajaxResponse: AjaxResponse<RefreshTokenQueryResponseType>) => {
                const errors = ajaxResponse.response.errors;
                if(errors && errors.length > 0){
                    throw new Error("Refresh token request contains errors." + errors)
                }

                const refreshTokenQueryResult = ajaxResponse.response.data.identityMutation.refreshToken;
                return refreshToken({
                    user: refreshTokenQueryResult.user,
                    accessToken: refreshTokenQueryResult.accessToken,
                    refreshToken: refreshTokenQueryResult.refreshToken
                });
            }),
            mergeMap(refreshTokenAction => {
                return concat(of(refreshTokenAction), of(action));
            }),
            catchError(error => {
                console.log(error)

                return concat(of(refreshTokenReject()), of(action));
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
                        let errorMessage = 'An unexpected error occurred';

                        if (error.status === 0) {
                            errorMessage = 'Connection time out';
                        } else if (error.message) {
                            errorMessage = error.message;
                        }

                        return of(loginFailure(errorMessage));
                    })
                )
            )
    )
);

