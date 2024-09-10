import {ofType, StateObservable} from "redux-observable";
import {map, from, catchError, of, mergeMap, Observable, tap, filter, concat, delay, takeUntil} from "rxjs";
import {ajax} from "rxjs/ajax";
import {authUserSuccess, authUserFailure, AuthPayload, refreshToken, refreshTokenReject} from "./authSlice.ts";
import { createRequest } from "../../misc/RequestCreator.ts";
import {authUserQuery, authUserQueryResponse, refreshTokenQuery, refreshTokenQueryResponse} from "./api/authQueries.ts"
import { authUser } from "./authSlice.ts";
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
            map((ajaxResponse) => {
                const data: refreshTokenQueryResponse = ajaxResponse.response.data;
                if(data.errors){
                    console.log(data.errors);
                    throw new Error("Refresh token request contains errors.")
                }

                return refreshToken({
                    user: data.identityMutation.refreshToken.user,
                    accessToken: data.identityMutation.refreshToken.accessToken,
                    refreshToken: data.identityMutation.refreshToken.refreshToken
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
    ofType(authUser.type),
    mergeMap((action: PayloadAction<AuthPayload>) =>
        from(
            ajax(createRequest(authUserQuery(action.payload.email, action.payload.password)))
                .pipe(
                    map((ajaxResponse: any) => {
                        const data: authUserQueryResponse = ajaxResponse.response.data;
                        const errors = ajaxResponse.response.errors;

                        if(errors && errors.length > 0){
                            console.log(errors)
                        }

                        if (data && data.identityMutation && data.identityMutation.login) {
                            saveRefreshToken(data.identityMutation.login.refreshToken);

                            return authUserSuccess({
                                accessToken: data.identityMutation.login.accessToken,
                                user: data.identityMutation.login.user,
                            });
                        } else {
                            throw new Error('[AUTHENTICATION] Unexpected response format or missing login data');
                        }
                    }),
                    catchError((error: any) => {
                        let errorMessage = 'An unexpected error occurred';

                        if (error.status === 0) {
                            errorMessage = 'Connection time out';
                        } else if (error.message) {
                            errorMessage = error.message;
                        }

                        return of(authUserFailure(errorMessage));
                    })
                )
            )
    )
);

