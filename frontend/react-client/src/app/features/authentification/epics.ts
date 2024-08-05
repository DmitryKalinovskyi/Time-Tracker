import {ofType} from "redux-observable";
import {map, from, catchError, of, mergeMap, Observable, tap} from "rxjs";
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
                    map((ajaxResponse) => ajaxResponse.response.data),
                    // tap(data => console.log(data)),
                    map((data: authUserQueryResponse) => authUserSuccess({
                        accessToken: data.identityQuery.login.accessToken,
                        // accessToken : {
                        //     value: data.identityQuery.login.accessToken.value,
                        //     dateIssued: new Date(data.identityQuery.login.accessToken.dateIssued),
                        //     dateExpires: new Date(data.identityQuery.login.accessToken.dateExpires),
                        // },
                        user: data.identityQuery.login.user,
                        loading: false,
                        error: null
                    })),
                    catchError((error) => of(authUserFailure(error)))
                )
        
            )
    )
);

