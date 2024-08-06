import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { RegPayload, regUserFailure, regUserRequest, regUserSuccess } from "./regSlice";
import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { createRequest } from "../../misc/RequestCreator";
import { regUserQuery, regUserQueryResponse } from "../../../api/queries/userQueries";

export const regUserEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(regUserRequest.type),
        mergeMap((action: PayloadAction<RegPayload>) => {
            return ajax(createRequest(regUserQuery(action.payload.fullName, action.payload.email), null))
            .pipe(
                map((ajaxResponse: any) => {
                    const errors = ajaxResponse.response.errors;
                    const data: regUserQueryResponse = ajaxResponse.response.data;

                    if (errors && errors.length > 0) {
                      return regUserFailure(errors[0].message);
                    }
                    if (data && data.userMutation.createUser) {
                      return regUserSuccess(data.userMutation.createUser);
                    } else {
                      throw new Error('[REGISTRATION] Unexpected response format or missing user data');
                    }
                  }),
                  catchError((error: any) =>
                    of(regUserFailure(error.message || 'An unexpected error occurred'))
                  ) 
            )
        })
    );