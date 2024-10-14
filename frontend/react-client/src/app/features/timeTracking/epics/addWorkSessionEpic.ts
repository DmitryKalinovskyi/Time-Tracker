import {catchError, map, Observable, of, switchMap} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {AddWorkSessionPayload, addWorkSession, addWorkSessionSuccessful} from "../timeTrackingSlice.ts";
import {ofType} from "redux-observable";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "@time-tracker/shared/misc/RequestCreator.ts";
import {addWorkSessionQuery, AddWorkSessionResponse} from "../api/addWorkSessionQuery.ts";
import {ShowFailure, ShowSuccess} from "@time-tracker/shared/misc/SnackBarHelper.ts";

export const addWorkSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(addWorkSession.type),
    switchMap((action: PayloadAction<AddWorkSessionPayload>) =>
        ajax(createRequest(addWorkSessionQuery(), {input: {...action.payload}})).pipe(
            map((ajaxResponse: AjaxResponse<AddWorkSessionResponse>) => {
                const errors = ajaxResponse.response.errors;

                if (errors && errors.length > 0) {
                    console.log(errors)
                    throw new Error(errors[0].message);
                }

                ShowSuccess("Work session added.")
                return addWorkSessionSuccessful(ajaxResponse.response.data.timeTrackerMutation.addSession);
            }),
            catchError((error) => {
                console.log(error);
                ShowFailure(error.message);
                return of();
            })
        )
    )
);