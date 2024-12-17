import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    fetchUsers,
    fetchUsersFailure,
    FetchUsersPayload,
    fetchUsersSuccess
} from "@time-tracker/pages/users/usersSlice.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {getUsersQuery} from "@time-tracker/pages/users/api/usersQueries.ts";

export const getUsersEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(fetchUsers.type),
    mergeMap((action: PayloadAction<FetchUsersPayload>) =>
        apiRequest(getUsersQuery(),
            {
                "input": action.payload
            }).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => fetchUsersSuccess(ajaxResponse.response),
                (ajaxResponse, error) => fetchUsersFailure(error)
            )
        )
    )
);