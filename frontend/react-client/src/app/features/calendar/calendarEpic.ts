import {catchError, map, mergeMap, Observable, of, tap} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "../../misc/RequestCreator.ts";
import {
    createCalendarEventQuery,
    CreateCalendarEventQueryResponseType, deleteCalendarEventQuery, DeleteCalendarEventQueryResponseType,
    updateCalendarEventQuery, UpdateCalendarEventQueryResponseType
} from "./api/calendarQueries.ts";
import {addCalendarEvent, removeCalendarEvent, updateCalendarEvent} from "./calendarSlice.ts";

export interface AddCalendarEventInputType {
    startTime: Date,
    endTime: Date
}

export const apiAddCalendarEvent = (calendarEventInput: AddCalendarEventInputType) =>
    ({type: "API_ADD_CALENDAR_EVENT", payload: calendarEventInput})

export const addCalendarEventEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType("API_ADD_CALENDAR_EVENT"),
        mergeMap((action: PayloadAction<AddCalendarEventInputType>) =>
            ajax(createRequest(createCalendarEventQuery(), {createCalendarEventInput: action.payload})).pipe(
                map((ajaxResponse: AjaxResponse<CreateCalendarEventQueryResponseType>) => {
                    const errors = ajaxResponse.response.errors;
                    const data = ajaxResponse.response.data;
                    if (errors && errors.length > 0) {
                        throw new Error(errors[0]);
                    }

                    return addCalendarEvent(data.calendarMutation.createCalendarEvent);
                }),
                catchError((error: any) => {
                    console.log(error)
                    console.log("Error while trying to add calendar event.");
                    return of();
                })
            )
        )
    );

export interface UpdateCalendarEventInputType{
    startTime: Date,
    endTime: Date,
    id: number
}

export const apiUpdateCalendarEvent = (updateCalendarEventInput: UpdateCalendarEventInputType) =>
    ({type: "API_UPDATE_CALENDAR_EVENT", payload: updateCalendarEventInput})

export const updateCalendarEventEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType("API_UPDATE_CALENDAR_EVENT"),
        mergeMap((action: PayloadAction<AddCalendarEventInputType>) =>
            ajax(createRequest(updateCalendarEventQuery(), {updateCalendarEventInput: action.payload})).pipe(
                map((ajaxResponse: AjaxResponse<UpdateCalendarEventQueryResponseType>) => {
                    const errors = ajaxResponse.response.errors;
                    const data = ajaxResponse.response.data;

                    if (errors && errors.length > 0) {
                        throw new Error(errors[0]);
                    }

                    return updateCalendarEvent(data.calendarMutation.updateCalendarEvent);
                }),
                catchError((error: any) => {
                    console.log("Error while trying to add calendar event.");
                    return of();
                })
            )
        )
    );

export const apiDeleteCalendarEvent = (calendarEventId: number) =>
    ({type: "API_DELETE_CALENDAR_EVENT", payload: calendarEventId})

export const deleteCalendarEventEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType("API_DELETE_CALENDAR_EVENT"),
        mergeMap((action: PayloadAction<number>) =>
            ajax(createRequest(deleteCalendarEventQuery(), {calendarEventId: action.payload})).pipe(
                map((ajaxResponse: AjaxResponse<DeleteCalendarEventQueryResponseType>) => {
                    const errors = ajaxResponse.response.errors;

                    if (errors && errors.length > 0) {
                        throw new Error(errors[0]);
                    }

                    return removeCalendarEvent(action.payload);
                }),
                catchError((error: any) => {
                    console.log("Error while trying to add calendar event.");
                    return of();
                })
            )
        )
    );