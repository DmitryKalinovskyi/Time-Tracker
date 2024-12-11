import {ShowFailure} from "@time-tracker/shared/misc/SnackBarHelper.ts";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {ofType, StateObservable} from "redux-observable";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {
    deleteWorkSessionSuccess,
    getTodayTotalDuration,
    getTodayTotalDurationSuccessful, stopSessionSuccessful
} from "../timeTrackingSlice.ts";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "@time-tracker/shared/misc/RequestCreator.ts";
import {
    getTodayTotalDurationByUserIdQuery,
    GetTodayTotalDurationResponse
} from "../api/getTodayTotalDurationByUserId.ts";
import {RootState} from "../../../store.ts";

export const getTodayTotalDurationEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(getTodayTotalDuration.type, deleteWorkSessionSuccess.type, stopSessionSuccessful.type),
    switchMap(() =>
        ajax(createRequest(getTodayTotalDurationByUserIdQuery(state$.value.auth.user.id))).pipe(
            map((ajaxResponse: AjaxResponse<GetTodayTotalDurationResponse>) => {
                const errors = ajaxResponse.response.errors;

                if (errors && errors.length > 0) {
                    throw new Error(errors[0].message);
                }
                return getTodayTotalDurationSuccessful(ajaxResponse.response.data.timeTrackerQuery.totalDuration??0);
            }),
            catchError((error) => {
                ShowFailure(error.message);
                return of();
            })
        )
    )
)

