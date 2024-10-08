import {catchError, map, Observable, of, switchMap} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType, StateObservable} from "redux-observable";
import {
    deleteWorkSessionSuccess,
    getWorkSessions,
    getWorkSessionsSuccessful,
    setWorkSessionsPage, startSessionSuccessful,
    stopSessionSuccessful
} from "../timeTrackingSlice.ts";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "../../../misc/RequestCreator.ts";
import {getWorkSessionsQuery, GetWorkSessionsResponse} from "../api/getWorkSessionsQuery.ts";
import {ShowFailure} from "../../../misc/SnackBarHelper.ts";
import {RootState} from "../../../store.ts";

export const getWorkSessionsEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(getWorkSessions.type,
        setWorkSessionsPage.type,
        startSessionSuccessful.type,
        stopSessionSuccessful.type,
        deleteWorkSessionSuccess.type,
        ),
    switchMap(() =>
        ajax(createRequest(getWorkSessionsQuery(), {
            input: {
                pageNumber: state$.value.timeTracker.paginationInfo.currentPage,
                pageSize: state$.value.timeTracker.paginationInfo.pageSize,
            }
        })).pipe(
            map((ajaxResponse: AjaxResponse<GetWorkSessionsResponse>) => {
                const errors = ajaxResponse.response.errors;
                if (errors && errors.length > 0) {
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
    )
);
