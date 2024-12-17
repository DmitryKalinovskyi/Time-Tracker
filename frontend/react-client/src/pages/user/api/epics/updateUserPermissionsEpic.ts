import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    updateUserPermissions, updateUserPermissionsFailure,
    UpdateUserPermissionsPayload,
    updateUserPermissionsSuccess
} from "@time-tracker/pages/user/userSlice.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {updateUserPermissionsMutation} from "@time-tracker/pages/user/api/userQueries.ts";

export const updateUserPermissionsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(updateUserPermissions.type),
    mergeMap((action: PayloadAction<UpdateUserPermissionsPayload>) =>
        apiRequest(updateUserPermissionsMutation(),
            {
                "id": action.payload.id,
                "permissions": action.payload.permissions
            })
            .pipe(
                catchAnyGraphQLError(
                    () => updateUserPermissionsSuccess(action.payload.id),
                    (ajaxResponse, error) => updateUserPermissionsFailure(error)
                )
            )
    )
);