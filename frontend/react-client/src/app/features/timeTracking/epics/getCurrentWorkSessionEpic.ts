import {catchError, map, Observable, of, switchMap} from "rxjs";
import {getCurrentWorkSession, getCurrentWorkSessionSuccessful} from "../timeTrackingSlice.ts";
import {ofType} from "redux-observable";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {createRequest} from "../../../misc/RequestCreator.ts";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {CurrentWorkSessionResponse, getCurrentWorkSessionQuery} from "../api/currentWorkSessionQuery.ts";
import {ShowFailure} from "../../../misc/SnackBarHelper.ts";

export const getCurrentWorkSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(getCurrentWorkSession.type),
    switchMap((action: PayloadAction<number>) =>
        ajax(createRequest(getCurrentWorkSessionQuery(), {userId: action.payload})).pipe(
            map((ajaxResponse: AjaxResponse<CurrentWorkSessionResponse>) => {
                const errors = ajaxResponse.response.errors;
                if (errors && errors.length > 0) {
                    throw new Error(errors[0].message);
                }
                console.log(ajaxResponse.response.data)
                return getCurrentWorkSessionSuccessful(ajaxResponse.response.data.timeTrackerQuery.currentWorkSession);
            }),
            catchError((error) => {
                ShowFailure(error.message);
                return of();
            })
        )
    )
);
