import {Action, PayloadAction} from "@reduxjs/toolkit";
import {mergeMap, Observable} from "rxjs";
import {
    VerifyPayload,
    verifyUserFailure,
    verifyUser,
    verifyUserSuccess
} from "@time-tracker/pages/account-verification/verifySlice.ts";
import {ofType} from "redux-observable";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {verifyUserQuery} from "@time-tracker/pages/account-verification/api/queries/verifyUserQuery.ts";

export const verifyUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(verifyUser.type),
    mergeMap((action: PayloadAction<VerifyPayload>) =>
        apiRequest(verifyUserQuery(), {input: action.payload}).pipe(
            catchAnyGraphQLError(
                () => verifyUserSuccess(),
            (_ajaxResponse, error) => verifyUserFailure(error.message)
            )
        )
    )
);