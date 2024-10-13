import {catchError, concat, delay, filter, from, map, mergeMap, Observable, of, tap} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "@time-tracker/shared/misc/RequestCreator.ts";
import {WorkReportQueryResponse, workReportQuery} from "./api/workReportingQueries.ts";
import {ShowFailure} from "@time-tracker/shared/misc/SnackBarHelper.ts";
import {
    fetchWorkReport,
    fetchWorkReportFailure,
    fetchWorkReportSuccess,
    WorkReportRequest
} from "./workReportingSlice.ts";

export const fetchWorkReportEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(fetchWorkReport.type),
    mergeMap((action: PayloadAction<WorkReportRequest>) => from(
        ajax(createRequest(workReportQuery(), {input: action.payload})).pipe(
            map((ajaxResponse: AjaxResponse<WorkReportQueryResponse>) => {
                const errors = ajaxResponse.response.errors;
                if(errors && errors.length > 0){
                    throw new Error("Response contains errors." + errors)
                }

                return fetchWorkReportSuccess(ajaxResponse.response.data.workReportingQuery.workReport);
            }),
            catchError(error => {
                console.log(error)
                ShowFailure("Failed to fetch user data.")
                return fetchWorkReportFailure();
            })
        )
    ))
);
