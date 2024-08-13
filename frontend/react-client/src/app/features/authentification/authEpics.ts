import {ofType} from "redux-observable";
import {map, from, catchError, of, mergeMap, Observable, tap, filter} from "rxjs";
import {ajax} from "rxjs/ajax";
import {authUserSuccess, authUserFailure, AuthPayload, refreshToken} from "./authSlice.ts";
import { createRequest } from "../../misc/RequestCreator.ts";
import {authUserQuery, authUserQueryResponse, refreshTokenQuery, refreshTokenQueryResponse} from "./api/authQueries.ts"
import { authUser } from "./authSlice.ts";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../../store.ts"
import {isTokenExpired} from "../../misc/tokenValidation.ts";
import {getRefreshToken, saveRefreshToken} from "./refreshTokenManager.ts";
export const refreshTokenEpic = (action$) => action$.pipe(
    filter(() => {
        console.log("Refresh epic invoked.")
        const refreshToken = getRefreshToken();
        if(refreshToken == null) {
            // console.log("Refresh token is not setup.")
            return false;
        }

        if(isTokenExpired(refreshToken)) {
            // console.log("Refresh Token is expired")
            return false;
        }

        // we invoke action when we have valid refresh token and expired access token.
        const auth = store.getState().auth;
        return auth.accessToken == null || isTokenExpired(auth.accessToken);

    }),
    tap(() => console.log('Token expired. We need to make request with refresh to receive new access.')),
    mergeMap((action) => from(
        ajax(createRequest(refreshTokenQuery(),
            {
                input: {
                    refreshToken: getRefreshToken()?.value,
                    accessToken:  store.getState().auth.accessToken?.value
                }})).pipe(
            map((ajaxResponse) => {
                const data: refreshTokenQueryResponse = ajaxResponse.response.data;

                saveRefreshToken(data.identityMutation.refreshToken.refreshToken);

                return refreshToken({
                    user: data.identityMutation.refreshToken.user,
                    accessToken: data.identityMutation.refreshToken.accessToken
                });
            }),
            catchError(error => {
                console.log("Refresh token error.");
                return of(action);
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

                        if (data && data.identityMutation && data.identityMutation.login) {
                            saveRefreshToken(data.identityMutation.login.refreshToken);

                            return authUserSuccess({
                                accessToken: data.identityMutation.login.accessToken,
                                user: data.identityMutation.login.user,
                                loading: false,
                                error: null,
                                success: true,
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

