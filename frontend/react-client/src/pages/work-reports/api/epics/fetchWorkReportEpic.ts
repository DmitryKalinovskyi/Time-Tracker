import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {workReportQuery} from "@time-tracker/pages/work-reports/api/workReportingQueries.ts";
import {
    fetchWorkReport,
    fetchWorkReportFailure,
    fetchWorkReportSuccess,
    WorkReportRequest
} from "@time-tracker/pages/work-reports/workReportingSlice.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const fetchWorkReportEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(fetchWorkReport.type),
    mergeMap((action: PayloadAction<WorkReportRequest>) =>
        apiRequest(workReportQuery(), {input: action.payload}).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => fetchWorkReportSuccess(ajaxResponse.response.data.workReportingQuery.workReport),
                (ajaxResponse, error) => fetchWorkReportFailure(error)
            )
        )
    )
)
