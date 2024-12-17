import {mergeMap, Observable} from "rxjs";
import {Action} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {stopSession, stopSessionFailure, stopSessionSuccessful} from "../../timeTrackingSlice.ts";
import {stopSessionQuery} from "../queries/stopSessionQuery.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const stopSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(stopSession.type),
    mergeMap(() =>
        apiRequest(stopSessionQuery()).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => stopSessionSuccessful(ajaxResponse.response.data.timeTrackerMutation.stopSession),
                (ajaxResponse, error) => stopSessionFailure(error)
            )
        )
    )
);