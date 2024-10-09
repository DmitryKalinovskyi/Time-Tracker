import {catchError, from, map, Observable, of, switchMap} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {deleteWorkSession, deleteWorkSessionSuccess} from "../timeTrackingSlice.ts";
import {ofType} from "redux-observable";
import {ajax} from "rxjs/ajax";
import {createRequest} from "../../../misc/RequestCreator.ts";
import {deleteWorkSessionQuery} from "../api/deleteWorkSessionQuery.ts";
import {ShowFailure, ShowSuccess} from "../../../misc/SnackBarHelper.ts";

export const deleteWorkSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(deleteWorkSession.type),
    switchMap((action: PayloadAction<number>) => from(
            ajax(createRequest(deleteWorkSessionQuery(), {workSessionId: action.payload}))
                .pipe(
                    map((ajaxResponse) => {
                        const errors = ajaxResponse.response.errors;
                        if (errors && errors.length > 0) {
                            throw new Error(errors[0].message);
                        }

                        ShowSuccess("Session deleted successfully.")

                        return deleteWorkSessionSuccess(action.payload);
                    }),
                    catchError((error) => {
                        ShowFailure(error.message);
                        return of();
                    })
                )
        )
    )
);