import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "@time-tracker/shared/misc/RequestCreator.ts";
import {
    createCalendarEventQuery,
    CreateCalendarEventQueryResponseType,
    deleteCalendarEventQuery,
    DeleteCalendarEventQueryResponseType,
    fetchUserById,
    FetchUserByIdResponseType,
    updateCalendarEventQuery,
    UpdateCalendarEventQueryResponseType
} from "./api/calendarQueries.ts";
import {
    addCalendarEvent, AddCalendarEventInputType, apiCreateCalendarEvent, apiDeleteCalendarEvent, apiUpdateCalendarEvent,
    fetchAndSetSelectedUser,
    removeCalendarEvent,
    setSelectedUser,
    updateCalendarEvent, UpdateCalendarEventInputType
} from "./calendarSlice.ts";
import {ShowFailure, ShowSuccess} from "@time-tracker/shared/misc/SnackBarHelper.ts";



export const createCalendarEventEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(apiCreateCalendarEvent.type),
    mergeMap((action: PayloadAction<AddCalendarEventInputType>) =>
        ajax(createRequest(createCalendarEventQuery(), {createCalendarEventInput: action.payload})).pipe(
            map((ajaxResponse: AjaxResponse<CreateCalendarEventQueryResponseType>) => {
                const errors = ajaxResponse.response.errors;
                const data = ajaxResponse.response.data;
                if (errors && errors.length > 0) {
                    throw new Error(errors[0].message);
                }
                ShowSuccess("Work time added.")
                return addCalendarEvent(data.calendarMutation.createCalendarEvent);
            }),
            catchError((error) => {
                console.log(error)
                ShowFailure("An error occurred while trying to add the calendar event.");
                return of();
            })
        )
    )
);



export const updateCalendarEventEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(apiUpdateCalendarEvent.type),
    mergeMap((action: PayloadAction<UpdateCalendarEventInputType>) =>
        ajax(createRequest(updateCalendarEventQuery(), {updateCalendarEventInput: action.payload})).pipe(
            map((ajaxResponse: AjaxResponse<UpdateCalendarEventQueryResponseType>) => {
                const errors = ajaxResponse.response.errors;
                const data = ajaxResponse.response.data;

                if (errors && errors.length > 0) {
                    throw new Error(errors[0].message);
                }

                ShowSuccess("Work time updated.")
                return updateCalendarEvent(data.calendarMutation.updateCalendarEvent);
            }),
            catchError((error) => {
                console.log(error)
                ShowFailure("Error while trying to add calendar event.");
                return of();
            })
        )
    )
);

export const deleteCalendarEventEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(apiDeleteCalendarEvent.type),
    mergeMap((action: PayloadAction<number>) =>
        ajax(createRequest(deleteCalendarEventQuery(), {calendarEventId: action.payload})).pipe(
            map((ajaxResponse: AjaxResponse<DeleteCalendarEventQueryResponseType>) => {
                const errors = ajaxResponse.response.errors;

                if (errors && errors.length > 0) {
                    throw new Error(errors[0].message);
                }

                ShowSuccess("Work time removed.")
                return removeCalendarEvent(action.payload);
            }),
            catchError((error) => {
                console.log(error)
                ShowFailure("Error when trying to remove calendar event.");
                return of();
            })
        )
    )
);

export const fetchAndSetSelectedUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(fetchAndSetSelectedUser.type),
    mergeMap((action: PayloadAction<number>) =>
        ajax(createRequest(fetchUserById(), {userId: action.payload})).pipe(
            map((ajaxResponse: AjaxResponse<FetchUserByIdResponseType>) => {
                const errors = ajaxResponse.response.errors;

                if (errors && errors.length > 0) {
                    throw new Error(errors[0].message);
                }

                return setSelectedUser(ajaxResponse.response.data.usersQuery.user);
            }),
            catchError((error) => {
                console.log(error)
                ShowFailure("Error while fetching user calendar.");
                return of();
            })
        )
    )
);
