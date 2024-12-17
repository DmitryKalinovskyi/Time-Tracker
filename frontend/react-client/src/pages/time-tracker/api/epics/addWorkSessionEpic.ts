import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {
    addWorkSession,
    addWorkSessionFailure,
    AddWorkSessionPayload,
    addWorkSessionSuccessful
} from "../../timeTrackingSlice.ts";
import {ofType} from "redux-observable";
import {addWorkSessionQuery} from "../queries/addWorkSessionQuery.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const addWorkSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(addWorkSession.type),
    mergeMap((action: PayloadAction<AddWorkSessionPayload>) =>
        apiRequest(addWorkSessionQuery(), {input: {...action.payload}}).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => addWorkSessionSuccessful(ajaxResponse.response.data.timeTrackerMutation.addSession),
                (_ajaxResponse, error) => addWorkSessionFailure(error)
            )
        )
    )
);