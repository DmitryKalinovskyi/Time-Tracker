import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import { ResetPlayload, resetUserPasswordRequest, resetUserPasswordSuccess, resetUserPasswordFailure } from "./resetSlice.ts";
import { ofType } from "redux-observable";
import {ajax} from "rxjs/ajax";
import {createRequest} from "../../misc/RequestCreator.ts";
import {resetUserPasswordQuery} from "../../../api/queries/userQueries.ts";

export const resetUserPasswordEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(resetUserPasswordRequest.type),
        mergeMap((action: PayloadAction<ResetPlayload>) => {
            return ajax(createRequest(resetUserPasswordQuery(action.payload.email)))
                .pipe(
                    map((ajaxResponse: any) => {
                        const errors = ajaxResponse.response.errors;
                        const data = ajaxResponse.response.data;

                        if (errors && errors.length > 0) {
                            return resetUserPasswordFailure(errors[0].message)
                        }
                        if (data && data.userMutation.resetPassword){
                            return resetUserPasswordSuccess();
                        }
                        else {
                            throw new Error('[RESET] Unexpected response format or missing user data');
                        }
                    }),
                    catchError((error: any) => {
                        let errorMessage = 'An unexpected error occurred';

                        if (error.status === 0) {
                            errorMessage = 'Connection time out';
                        } else if (error.message) {
                            errorMessage = error.message;
                        }

                        return of(resetUserPasswordFailure(errorMessage));
                    })
                )
        })
    )