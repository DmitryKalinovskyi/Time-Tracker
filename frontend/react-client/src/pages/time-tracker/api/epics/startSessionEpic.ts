import {mergeMap, Observable} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {startSession, startSessionFailure, startSessionSuccessful} from "../../timeTrackingSlice.ts";
import {startSessionQuery} from "../queries/startSessionQuery.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const startSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(startSession.type),
    mergeMap(() =>
        apiRequest(startSessionQuery()).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => startSessionSuccessful(ajaxResponse.response.data.timeTrackerMutation.startSession),
                (ajaxResponse, error) => startSessionFailure(error)
            )
        )
    )
);