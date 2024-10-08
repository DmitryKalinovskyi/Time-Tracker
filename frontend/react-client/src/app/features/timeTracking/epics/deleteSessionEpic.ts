import {catchError, from, map, Observable, of, switchMap} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {deleteSession} from "../timeTrackingSlice.ts";
import {ofType} from "redux-observable";
import {ajax} from "rxjs/ajax";
import {createRequest} from "../../../misc/RequestCreator.ts";
import {deleteSessionQuery} from "../api/deleteSessionQuery.ts";
import {ShowFailure} from "../../../misc/SnackBarHelper.ts";

export const deleteSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(deleteSession.type),
    switchMap((action: PayloadAction<number>) => from(
            ajax(createRequest(deleteSessionQuery(), {workSessionId: action.payload}))
                .pipe(
                    map((ajaxResponse) => {
                        const errors = ajaxResponse.response.errors;
                        if (errors && errors.length > 0) {
                            throw new Error(errors[0].message);
                        }

                        // return deleteSessionSuccessful(action.payload);
                    }),
                    catchError((error) => {
                        ShowFailure(error.message);
                        return of();
                    })
                )
        )
    )
);