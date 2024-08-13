import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { VerifPayload, verifUserRequest, verifUserSuccess, verifUserFailure } from "./verifSlice";
import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { createRequest } from "../../misc/RequestCreator";
import { verifUserQuery } from "../../../api/queries/userQueries";

export const verifUserEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(verifUserRequest.type),
            mergeMap((action: PayloadAction<VerifPayload>) => {
            return ajax(createRequest(verifUserQuery(action.payload.code, action.payload.password), null))
            .pipe(
                map((ajaxResponse: any) => {
                    const errors = ajaxResponse.response.errors;
                    const data = ajaxResponse.response.data;

                    if (errors && errors.length > 0) {
                      return verifUserFailure(errors[0].message);
                    }
                    if (data && data.userMutation.activateUser) {
                      return verifUserSuccess();
                    } else {
                      throw new Error('[VERIFICATION] Unexpected response format or missing user data');
                    }
                  }),
                catchError((error: any) => {
                    let errorMessage = 'An unexpected error occurred';

                    if (error.status === 0) {
                        errorMessage = 'Connection time out';
                    } else if (error.message) {
                        errorMessage = error.message;
                    }

                    return of(verifUserFailure(errorMessage));
                })
            )
        })
    );