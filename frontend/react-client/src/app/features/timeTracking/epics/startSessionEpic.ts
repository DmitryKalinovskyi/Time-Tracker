import {catchError, from, map, Observable, of, switchMap} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {startSession, startSessionSuccessful} from "../timeTrackingSlice.ts";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "@time-tracker/shared/misc/RequestCreator.ts";
import {startSessionQuery, StartSessionResponse} from "../api/startSessionQuery.ts";
import {ShowFailure} from "@time-tracker/shared/misc/SnackBarHelper.ts";

export const startSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(startSession.type),
    switchMap(() => from(
        ajax(createRequest(startSessionQuery()))
            .pipe(
                map((ajaxResponse: AjaxResponse<StartSessionResponse>) => {
                    const errors = ajaxResponse.response.errors;

                    if (errors && errors.length > 0) {
                        throw new Error(errors[0].message);
                    }

                    return startSessionSuccessful(ajaxResponse.response.data.timeTrackerMutation.startSession);
                }),
                catchError((error) => {
                    ShowFailure(error.message);
                    return of();
                })
            )
        )
    )
);