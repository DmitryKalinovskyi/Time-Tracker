import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {
    updateCalendarEvent,
    updateCalendarEventFailure,
    UpdateCalendarEventInputType, updateCalendarEventSuccess
} from "@time-tracker/pages/calendar/calendarSlice.ts";
import {updateCalendarEventQuery} from "@time-tracker/pages/calendar/api/calendarQueries.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";


export const updateCalendarEventEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(updateCalendarEvent.type),
    mergeMap((action: PayloadAction<UpdateCalendarEventInputType>) =>
        apiRequest(updateCalendarEventQuery(), {updateCalendarEventInput: action.payload}).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => updateCalendarEventSuccess(ajaxResponse.response.data.calendarMutation.updateCalendarEvent),
                () => updateCalendarEventFailure()
            )
        )
    )
);