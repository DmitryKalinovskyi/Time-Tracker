import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    AddCalendarEventInputType,
    createCalendarEvent,
    createCalendarEventFailure,
    createCalendarEventSuccess
} from "@time-tracker/pages/calendar/calendarSlice.ts";
import {createCalendarEventQuery,} from "@time-tracker/pages/calendar/api/calendarQueries.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const createCalendarEventEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(createCalendarEvent.type),
    mergeMap((action: PayloadAction<AddCalendarEventInputType>) =>
        apiRequest(createCalendarEventQuery(), {createCalendarEventInput: action.payload}).pipe(
            catchAnyGraphQLError(ajaxResponse =>
                createCalendarEventSuccess(ajaxResponse.response.data.calendarMutation.createCalendarEvent),
                () => createCalendarEventFailure(),
                true
            )
        )
    )
);
