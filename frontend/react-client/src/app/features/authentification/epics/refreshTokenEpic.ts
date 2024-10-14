import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    beginRefreshToken,
    refreshToken,
    refreshTokenReject
} from "@time-tracker/features/authentification/authSlice.ts";
import {AjaxResponse} from "rxjs/ajax";
import {
    refreshTokenQuery,
    RefreshTokenQueryResponseType
} from "@time-tracker/features/authentification/api/authQueries.ts";
import {getAvailableRefreshToken} from "@time-tracker/features/authentification/refreshTokenManager.ts";
import {
    InvalidRefreshTokenExecutionError
} from "@time-tracker/features/authentification/errors/InvalidRefreshTokenExecutionError.ts";
import {apiRequest} from "@time-tracker/shared/graphql/rxjs-operators";

export const refreshTokenEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(beginRefreshToken.type),
    mergeMap(() =>
        apiRequest(refreshTokenQuery(), {input: {refreshToken: getAvailableRefreshToken()?.value}}).pipe(
            map((ajaxResponse: AjaxResponse<RefreshTokenQueryResponseType>) => {
                const errors = ajaxResponse.response.errors;
                if (errors && errors.length > 0) {
                    if (errors[0].extensions.code === "INVALID_REFRESH_TOKEN")
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
    )
)