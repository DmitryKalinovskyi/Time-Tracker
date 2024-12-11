import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    setSelectedUser,
    setSelectedUserFailure,
    setSelectedUserSuccess
} from "@time-tracker/pages/calendar/calendarSlice.ts";
import {fetchUserById} from "@time-tracker/pages/calendar/api/calendarQueries.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";


export const fetchAndSetSelectedUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(setSelectedUser.type),
    mergeMap((action: PayloadAction<number>) =>
        apiRequest(fetchUserById(), {userId: action.payload}).pipe(
            catchAnyGraphQLError((ajaxResponse) =>
                    setSelectedUserSuccess(ajaxResponse.response.data.usersQuery.user),
                () => setSelectedUserFailure())
        )
    )
);