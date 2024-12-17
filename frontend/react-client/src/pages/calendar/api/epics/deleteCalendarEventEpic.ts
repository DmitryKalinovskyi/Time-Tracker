import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    deleteCalendarEvent,
    deleteCalendarEventFailure,
    deleteCalendarEventSuccess
} from "@time-tracker/pages/calendar/calendarSlice.ts";
import {deleteCalendarEventQuery,} from "@time-tracker/pages/calendar/api/calendarQueries.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const deleteCalendarEventEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(deleteCalendarEvent.type),
    mergeMap((action: PayloadAction<number>) =>
        apiRequest(deleteCalendarEventQuery(), {calendarEventId: action.payload}).pipe(
            catchAnyGraphQLError(
                () => deleteCalendarEventSuccess(action.payload),
                () => deleteCalendarEventFailure()
            )
        )
    )
);