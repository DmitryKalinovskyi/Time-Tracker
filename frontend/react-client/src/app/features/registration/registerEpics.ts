import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";
import { RegisterPayload, registerUserFailure, registerUserRequest, registerUserSuccess } from "./registerSlice.ts";
import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { createRequest } from "../../misc/RequestCreator";
import { registerUserQuery, RegisterUserQueryResponse } from "./api/registrationQueries.ts";

export const registerUserEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(registerUserRequest.type),
        mergeMap((action: PayloadAction<RegisterPayload>) => {
            return ajax(createRequest(registerUserQuery(), {
                input: action.payload
            }))
            .pipe(
                map((ajaxResponse: AjaxResponse<RegisterUserQueryResponse>) => {
                    const errors = ajaxResponse.response.errors;
                    const data = ajaxResponse.response.data;

                    if (errors && errors.length > 0) {
                      return registerUserFailure(errors[0].message);
                    }

                    return registerUserSuccess(data.userMutation.createUser);
                  }),
                catchError((error) => {
                    return of(registerUserFailure(error.message));
                })
            )
        })
    );