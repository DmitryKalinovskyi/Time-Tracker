import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    updateUserActiveStatus, updateUserActiveStatusFailure,
    UpdateUserActiveStatusPayload,
    updateUserActiveStatusSuccess
} from "@time-tracker/pages/user/userSlice.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {updateUserActiveStatusMutation} from "@time-tracker/pages/user/api/userQueries.ts";

export const updateUserActiveStatusEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(updateUserActiveStatus.type),
    mergeMap((action: PayloadAction<UpdateUserActiveStatusPayload>) =>
        apiRequest(updateUserActiveStatusMutation(),
            {
                "id": action.payload.id,
                "isActive": action.payload.isActive
            })
            .pipe(
                catchAnyGraphQLError(
                    () => updateUserActiveStatusSuccess(action.payload.id),
                    (ajaxResponse, error) => updateUserActiveStatusFailure(error)
                )
            )
    )
);
