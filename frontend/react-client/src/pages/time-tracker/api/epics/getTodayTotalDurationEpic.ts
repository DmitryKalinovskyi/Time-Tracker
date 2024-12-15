import {Observable, switchMap} from "rxjs";
import {ofType, StateObservable} from "redux-observable";
import {Action} from "@reduxjs/toolkit";
import {
    deleteWorkSessionSuccess,
    getTodayTotalDuration,
    getTodayTotalDurationFailure,
    getTodayTotalDurationSuccessful,
    stopSessionSuccessful
} from "../../timeTrackingSlice.ts";
import {getTodayTotalDurationByUserIdQuery} from "../queries/getTodayTotalDurationByUserId.ts";
import {RootState} from "@time-tracker/app/store.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const getTodayTotalDurationEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(getTodayTotalDuration.type, deleteWorkSessionSuccess.type, stopSessionSuccessful.type),
    switchMap(() =>
        apiRequest(getTodayTotalDurationByUserIdQuery(state$.value.auth.user.id)).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => getTodayTotalDurationSuccessful(ajaxResponse.response.data.timeTrackerQuery.totalDuration??0),
                (ajaxResponse, error) => getTodayTotalDurationFailure(error)
            )
        )
    )
)

