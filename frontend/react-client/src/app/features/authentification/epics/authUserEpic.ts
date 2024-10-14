import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {AuthPayload, loginFailure, loginSuccess, loginUser} from "@time-tracker/features/authentification/authSlice.ts";
import {ofType} from "redux-observable";
import {loginQuery, LoginQueryResponseType} from "@time-tracker/features/authentification/api/authQueries.ts";
import {apiRequest} from "@time-tracker/shared/graphql/rxjs-operators";
import {AjaxResponse} from "rxjs/ajax";
import {saveRefreshToken} from "@time-tracker/features/authentification/refreshTokenManager.ts";
import {
    InvalidCredentialsExecutionError
} from "@time-tracker/features/authentification/errors/InvalidCredentialsExecutionError.ts";

export const authUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(loginUser.type),
    mergeMap((action: PayloadAction<AuthPayload>) =>
        apiRequest<LoginQueryResponseType>(loginQuery(), {input: action.payload}).pipe(
            map((ajaxResponse: AjaxResponse<LoginQueryResponseType>) => {
                const errors = ajaxResponse.response.errors;

                if (errors && errors.length > 0) {
                    if (errors[0].extensions.code === "INVALID_CREDENTIALS")
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
                if (error instanceof InvalidCredentialsExecutionError) {
                    return of(loginFailure(error.message));
                }

                return of(loginFailure('An unexpected error occurred'));
            })
        )
    )
)
