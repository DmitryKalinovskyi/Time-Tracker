import {Observable, switchMap} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    fetchUser,
    fetchUserFailure,
    fetchUserSuccess,
    updateUserActiveStatusSuccess,
    updateUserPermissionsSuccess,
    updateUserSuccess
} from "@time-tracker/pages/user/userSlice.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {getUserQuery} from "@time-tracker/pages/user/api/userQueries.ts";

export const getUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(fetchUser.type, updateUserSuccess.type, updateUserPermissionsSuccess.type, updateUserActiveStatusSuccess.type),
    switchMap((action: PayloadAction<number>) =>
        apiRequest(getUserQuery(), {userId: action.payload}).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => {
                    const user = ajaxResponse.response.data.usersQuery.user;

                    if(user == null) return fetchUserFailure("User not founded.");

                    return fetchUserSuccess(ajaxResponse.response.data.usersQuery.user)
                },

                (ajaxResponse, error) => fetchUserFailure(error.message)
            )
        )
    )
);