import {ofType} from "redux-observable";
import {map, from, catchError, of, mergeMap, Observable} from "rxjs";
import {ajax} from "rxjs/ajax";
import {authUserSuccess, authUserFailure, AuthPayload} from "./authSlice.ts";
import { createRequest } from "../../misc/RequestCreator.ts";
import {authUserQuery, authUserQueryResponse} from "../../../api/queries/userQueries.ts";
import { authUser } from "./authSlice.ts";
import { Action, PayloadAction } from "@reduxjs/toolkit";

export const authUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(authUser.type),
    mergeMap((action: PayloadAction<AuthPayload>) =>
        from(
            ajax(createRequest(authUserQuery(action.payload.email, action.payload.password)))
                .pipe(
                    map((ajaxResponse: any) => {
                        console.log(ajaxResponse.data)
                        const errors = ajaxResponse.response.errors;
                        const data: authUserQueryResponse = ajaxResponse.response.data;
        
                        if (errors && errors.length > 0) {
                            return authUserFailure(errors[0].message);
                        }
        
                        if (data && data.identityMutation && data.identityMutation.login) {
                            return authUserSuccess({
                                accessToken: data.identityMutation.login.accessToken,
                                user: data.identityMutation.login.user,
                                loading: false,
                                error: null,
                                success: true,
                            });
                        } else {
                            throw new Error('[AUTHENTICATION] Unexpected response format or missing login data');
                        }
                    }),
                    catchError((error: any) => {
                        let errorMessage = 'An unexpected error occurred';

                        if (error.status === 0) {
                            errorMessage = 'Connection time out';
                        } else if (error.message) {
                            errorMessage = error.message;
                        }

                        return of(authUserFailure(errorMessage));
                    })
                )
            )
    )
);

