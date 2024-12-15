import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    updateUser,
    updateUserFailure,
    UpdateUserPayload,
    updateUserSuccess
} from "@time-tracker/pages/user/userSlice.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {updateUserMutation} from "@time-tracker/pages/user/api/userQueries.ts";

export const updateUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(updateUser.type),
    mergeMap((action: PayloadAction<UpdateUserPayload>) =>
        apiRequest(updateUserMutation(),
            {
                "id": action.payload.id,
                "fullName": action.payload.fullName,
                "email": action.payload.email
            }).pipe(
            catchAnyGraphQLError(
                () => updateUserSuccess(action.payload.id),
                (ajaxResponse, error) => updateUserFailure(error)
            )
        )
    )
);