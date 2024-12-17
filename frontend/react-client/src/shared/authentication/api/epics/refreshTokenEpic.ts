import {filter, mergeMap, Observable} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {beginRefreshToken, refreshToken, refreshTokenReject} from "@time-tracker/shared/authentication/authSlice.ts";
import {AjaxResponse} from "rxjs/ajax";
import {refreshTokenQuery, RefreshTokenQueryResponseType} from "@time-tracker/shared/authentication/api/authQueries.ts";
import {getAvailableRefreshToken} from "@time-tracker/shared/authentication/refreshTokenManager.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const refreshTokenEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(beginRefreshToken.type),
    filter(() => {
        const token = getAvailableRefreshToken();
        return token != null;
    }),
    mergeMap(() => {
        const token = getAvailableRefreshToken();
        if(token == null) throw new Error("Refresh token is null.")

        return apiRequest(refreshTokenQuery(), {input: {refreshToken: token.value}}).pipe(
            catchAnyGraphQLError((ajaxResponse: AjaxResponse<RefreshTokenQueryResponseType>) => {
                const refreshTokenQueryResult = ajaxResponse.response.data.identityMutation.refreshToken;
                return refreshToken({
                    user: refreshTokenQueryResult.user,
                    accessToken: refreshTokenQueryResult.accessToken,
                    refreshToken: refreshTokenQueryResult.refreshToken
                });
            },
            () => {
                return refreshTokenReject()
            })
        )
        }
    )
)