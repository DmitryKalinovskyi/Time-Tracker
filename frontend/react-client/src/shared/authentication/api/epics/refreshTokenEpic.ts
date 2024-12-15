import {mergeMap, Observable} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {beginRefreshToken, refreshToken, refreshTokenReject} from "@time-tracker/shared/authentication/authSlice.ts";
import {AjaxResponse} from "rxjs/ajax";
import {refreshTokenQuery, RefreshTokenQueryResponseType} from "@time-tracker/shared/authentication/api/authQueries.ts";
import {getAvailableRefreshToken} from "@time-tracker/shared/authentication/refreshTokenManager.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const refreshTokenEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(beginRefreshToken.type),
    mergeMap(() =>
        apiRequest(refreshTokenQuery(), {input: {refreshToken: getAvailableRefreshToken()?.value}}).pipe(
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
    )
)