import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { createUserRequest, createUserSuccess, createUserFailure, CreateUserPayload } from './userSlice.ts';
import { API_URL } from '../../config.ts';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { createUserQuery, createUserQueryResponse } from '../../../api/queries/userQueries.ts';
import User from "../../types/User.ts";

export const createUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(createUserRequest.type),
    mergeMap((action: PayloadAction<CreateUserPayload>) => {
        const { query, variables } = createUserQuery(action.payload as User);

        return ajax({
            url: `${API_URL}/graphql`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query,
                variables
            })
        }).pipe(
            map(response => {
                return response.response.data;
            }),
            map((data: createUserQueryResponse) => createUserSuccess(data.userMutation.createUser)),
            catchError(error => {
                console.error('Error:', error);
                return of(createUserFailure(error.message));
            })
        );
    })
);
