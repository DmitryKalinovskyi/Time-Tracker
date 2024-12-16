import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {AuthPayload, loginFailure, loginSuccess, loginUser} from "@time-tracker/shared/authentication/authSlice.ts";
import {ofType} from "redux-observable";
import {loginQuery, LoginQueryResponseType} from "@time-tracker/shared/authentication/api/authQueries.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const authUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(loginUser.type),
    mergeMap((action: PayloadAction<AuthPayload>) =>
        apiRequest<LoginQueryResponseType>(loginQuery(), {input: action.payload}).pipe(
            catchAnyGraphQLError((ajaxResponse) => {
                const loginResult = ajaxResponse.response.data.identityMutation.login;
                return loginSuccess({
                    accessToken: loginResult.accessToken,
                    refreshToken: loginResult.refreshToken,
                    user: loginResult.user,
                });
            },
            (ajaxResponse, error) => {
                if (error.extensions.code ==- "INVALID_CREDENTIALS") {
                    return loginFailure(error.message);
                }

                return loginFailure('An unexpected error occurred');
            })
        )
    )
)
