import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {deleteWorkSession, deleteWorkSessionFailure, deleteWorkSessionSuccess} from "../../timeTrackingSlice.ts";
import {ofType} from "redux-observable";
import {deleteWorkSessionQuery} from "../queries/deleteWorkSessionQuery.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const deleteWorkSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(deleteWorkSession.type),
    mergeMap((action: PayloadAction<number>) =>
        apiRequest(deleteWorkSessionQuery(), {workSessionId: action.payload}).pipe(
            catchAnyGraphQLError(
                () => deleteWorkSessionSuccess(action.payload),
                (_ajaxResponse, error) => deleteWorkSessionFailure(error)
            )
        )
    )
)