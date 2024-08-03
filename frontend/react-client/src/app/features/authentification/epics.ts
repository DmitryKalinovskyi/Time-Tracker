import {ofType} from "redux-observable";
import {map,from, catchError, of, mergeMap, Observable} from "rxjs";
import {ajax} from "rxjs/ajax";
import {authUserSuccess, authUserFailure, AuthPayload} from "./authSlice.ts";
import { createRequest } from "../../misc/RequestCreator.ts";
import { authUserQuery } from "../../../api/queries/userQueries.ts";
import { authUser } from "./authSlice.ts";
import { Action, PayloadAction } from "@reduxjs/toolkit";

export const authUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(authUser.type),
    mergeMap((action: PayloadAction<AuthPayload>) =>
        from(
            ajax(createRequest(authUserQuery(action.payload.email, action.payload.password)))
                .pipe(
                    map((ajaxResponse: any) => authUserSuccess(ajaxResponse.response.data.identityQuery.login)),
                    catchError((error: string) => of(authUserFailure(error)))
                )
        
            )
    )
);

