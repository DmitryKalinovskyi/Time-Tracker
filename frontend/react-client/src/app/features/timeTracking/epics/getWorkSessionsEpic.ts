import {catchError, map, Observable, of, switchMap} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType, StateObservable} from "redux-observable";
import {
    addWorkSessionSuccessful,
    applyTimeTrackerFilter,
    deleteWorkSessionSuccess,
    getWorkSessions,
    getWorkSessionsSuccessful,
    setWorkSessionsPage, startSessionSuccessful,
    stopSessionSuccessful, updateWorkSessionSuccessful
} from "../timeTrackingSlice.ts";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "../../../misc/RequestCreator.ts";
import {getWorkSessionsQuery, GetWorkSessionsResponse} from "../api/getWorkSessionsQuery.ts";
import {ShowFailure} from "../../../misc/SnackBarHelper.ts";
import {RootState} from "../../../store.ts";
import WorkSessionsInputBuilder from "../filtering/WorkSessionsInputBuilder.ts";

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
        return ajax(createRequest(getWorkSessionsQuery(), filterQueryBuilder.getVariables())).pipe(
            map((ajaxResponse: AjaxResponse<GetWorkSessionsResponse>) => {
                const errors = ajaxResponse.response.errors;
                if (errors && errors.length > 0) {
                    console.log(errors);
                    throw new Error(errors[0].message);
                }

                return getWorkSessionsSuccessful(ajaxResponse.response.data.timeTrackerQuery.workSessions);
            }),
            catchError((error) => {
                console.log(error)
                ShowFailure(error.message);
                return of();
            })
        )
    })
);
