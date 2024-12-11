import {
    UpdateSessionPayload,
    updateWorkSession,
    updateWorkSessionFailure,
    updateWorkSessionSuccessful
} from "../timeTrackingSlice.ts";
import {ofType} from "redux-observable";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "@time-tracker/shared/misc/RequestCreator.ts";
import {updateWorkSessionQuery, UpdateWorkSessionResponse} from "../api/updateWorkSessionQuery.ts";
import {ShowFailure, ShowSuccess} from "@time-tracker/shared/misc/SnackBarHelper.ts";

export const updateWorkSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(updateWorkSession.type),
    switchMap((action: PayloadAction<UpdateSessionPayload>) =>
        ajax(createRequest(updateWorkSessionQuery(action.payload)))
            .pipe(
                map((ajaxResponse: AjaxResponse<UpdateWorkSessionResponse>) => {
                    const errors = ajaxResponse.response.errors;

                    if (errors && errors.length > 0) {
                        throw new Error(errors[0].message);
                    }

                    ShowSuccess("Work session updated successful.")
                    return updateWorkSessionSuccessful(ajaxResponse.response.data.timeTrackerMutation.updateSession);
                }),
                catchError((error) => {
                    ShowFailure(error.message);
                    return of(updateWorkSessionFailure());
                })
            )
    )
);
