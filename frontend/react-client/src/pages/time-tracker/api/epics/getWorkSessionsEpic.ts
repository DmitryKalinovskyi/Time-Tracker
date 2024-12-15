import {Observable, switchMap} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType, StateObservable} from "redux-observable";
import {
    addWorkSessionSuccessful,
    applyTimeTrackerFilter,
    deleteWorkSessionSuccess,
    getWorkSessions,
    getWorkSessionsFailure,
    getWorkSessionsSuccessful,
    setWorkSessionsPage,
    startSessionSuccessful,
    stopSessionSuccessful,
    updateWorkSessionSuccessful
} from "../../timeTrackingSlice.ts";
import {getWorkSessionsQuery} from "../queries/getWorkSessionsQuery.ts";
import WorkSessionsInputBuilder from "@time-tracker/pages/time-tracker/api/filtering/WorkSessionsInputBuilder.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {RootState} from "@time-tracker/app/store.ts";

export const getWorkSessionsEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(getWorkSessions.type,
        setWorkSessionsPage.type,
        startSessionSuccessful.type,
        stopSessionSuccessful.type,
        addWorkSessionSuccessful.type,
        updateWorkSessionSuccessful.type,
        deleteWorkSessionSuccess.type,
        applyTimeTrackerFilter.type,
        ),
    switchMap(() => {
        const filterQueryBuilder = new WorkSessionsInputBuilder(state$.value);
        return apiRequest(getWorkSessionsQuery(), filterQueryBuilder.getVariables()).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => getWorkSessionsSuccessful(ajaxResponse.response.data.timeTrackerQuery.workSessions),
                (ajaxResponse, error) => getWorkSessionsFailure(error)
            )
        )
    })
);
