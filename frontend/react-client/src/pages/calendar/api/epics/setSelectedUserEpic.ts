import {Observable, switchMap} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    setSelectedUser,
    setSelectedUserFailure,
    setSelectedUserSuccess
} from "@time-tracker/pages/calendar/calendarSlice.ts";
import {fetchUserById, FetchUserByIdResponse} from "@time-tracker/pages/calendar/api/calendarQueries.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {AjaxResponse} from "rxjs/ajax";


export const setSelectedUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(setSelectedUser.type),
    switchMap((action: PayloadAction<number>) =>
        apiRequest(fetchUserById(), {userId: action.payload}).pipe(
            catchAnyGraphQLError(
                (ajaxResponse: AjaxResponse<FetchUserByIdResponse>) => setSelectedUserSuccess(ajaxResponse.response.data.usersQuery.user),
                () => setSelectedUserFailure())
        )
    )
);