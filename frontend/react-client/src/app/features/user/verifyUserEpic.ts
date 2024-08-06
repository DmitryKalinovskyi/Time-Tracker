import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { verifyUserRequest, verifyUserSuccess, verifyUserFailure } from './userSlice.ts';
import { API_URL } from '../../config.ts';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { verifyUserQuery } from '../../../api/queries/userQueries.ts';

export const verifyUserEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(verifyUserRequest.type),
    mergeMap((action: PayloadAction<{ code: string; password: string }>) => {
        const requestBody = verifyUserQuery(action.payload);
        return ajax({
            url: `${API_URL}/graphql`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        }).pipe(
            map(response => {
                if (response.response.data.userMutation.activateUser) {
                    return verifyUserSuccess();
                } else {
                    return verifyUserFailure('Verification failed');
                }
            }),
            catchError(error => {
                console.error('Error:', error);
                return of(verifyUserFailure(error.message));
            })
        );
    })
);
