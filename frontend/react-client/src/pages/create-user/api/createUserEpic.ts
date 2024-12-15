import {Action, PayloadAction} from "@reduxjs/toolkit";
import {mergeMap, Observable} from "rxjs";
import {CreateUserPayload, createUserFailure, createUser, createUserSuccess} from "../createUserSlice.ts";
import {Epic, ofType} from "redux-observable";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";
import {
    registerUserQuery,
    RegisterUserQueryResponse
} from "@time-tracker/pages/create-user/api/queries/createUserQuery.ts";

export const createUserEpic: Epic<Action, Action> = (action$: Observable<Action>) => action$.pipe(
    ofType(createUser.type),
    mergeMap((action: PayloadAction<CreateUserPayload>) =>
        apiRequest(registerUserQuery(), {input: action.payload}).pipe(
            catchAnyGraphQLError<RegisterUserQueryResponse>(
                (ajaxResponse) => createUserSuccess(ajaxResponse.response.data.userMutation.createUser),
                (_ajaxResponse, error) => createUserFailure(error.message)
            )
        )
    )
)