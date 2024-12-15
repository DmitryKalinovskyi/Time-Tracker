import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {
    resetPassword,
    resetPasswordFailure,
    ResetPasswordPayload,
    resetPasswordSuccess
} from "../resetPasswordSlice.ts";
import {ofType} from "redux-observable";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {resetPasswordQuery} from "@time-tracker/pages/reset-password/api/queries/resetPasswordQuery.ts";

export const resetPasswordEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(resetPassword.type),
    mergeMap((action: PayloadAction<ResetPasswordPayload>) =>
        apiRequest(resetPasswordQuery(), {input: {email: action.payload.email}}).pipe(
            catchAnyGraphQLError(
                () => resetPasswordSuccess(),
                (_, error) => resetPasswordFailure(error.message)
            )
        )
    )
)