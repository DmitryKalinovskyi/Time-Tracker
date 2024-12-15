import {
    UpdateSessionPayload,
    updateWorkSession,
    updateWorkSessionFailure,
    updateWorkSessionSuccessful
} from "../../timeTrackingSlice.ts";
import {ofType} from "redux-observable";
import {mergeMap, Observable} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {updateWorkSessionQuery} from "../queries/updateWorkSessionQuery.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const updateWorkSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(updateWorkSession.type),
    mergeMap((action: PayloadAction<UpdateSessionPayload>) =>
        apiRequest(updateWorkSessionQuery(action.payload)).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) =>  updateWorkSessionSuccessful(ajaxResponse.response.data.timeTrackerMutation.updateSession),
                (ajaxResponse, error) => updateWorkSessionFailure(error)
            )
        )
    )
);
