import {catchError, map, Observable, of, switchMap} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {setError, stopSession, stopSessionSuccessful} from "../timeTrackingSlice.ts";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "../../../misc/RequestCreator.ts";
import {stopSessionQuery, StopSessionResponse} from "../api/stopSessionQuery.ts";
import {ShowFailure} from "../../../misc/SnackBarHelper.ts";

export const stopSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(stopSession.type),
    switchMap(() => ajax(createRequest(stopSessionQuery())).pipe(
            map((ajaxResponse: AjaxResponse<StopSessionResponse>) => {
                const errors = ajaxResponse.response.errors;
                if (errors && errors.length > 0) {
                    throw new Error(errors[0].message);
                }

                return stopSessionSuccessful(ajaxResponse.response.data.timeTrackerMutation.stopSession);
            }),
            catchError((error) => {
                ShowFailure(error.message);
                return of();
            })
        )
    )
);