import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import {verifyUserRequest, verifyUserSuccess, verifyUserFailure} from './userSlice';
import { API_URL } from '../../app/config';

const VERIFY_USER_MUTATION = `
    mutation ActivateUser($input: ActivateUserInput!) {
        userMutation {
            activateUser(input: $input)
        }
    }
`;

export const verifyUserEpic = (action$) =>
    action$.pipe(
        ofType(verifyUserRequest.type),
        mergeMap(action => {
            return ajax({
                url: `${API_URL}/graphql`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    query: VERIFY_USER_MUTATION,
                    variables: { input: action.payload }
                }
            }).pipe(
                map(() => {
                    return verifyUserSuccess();
                }),
                catchError(error => {
                    console.error('Error:', error);
                    return [verifyUserFailure(error.message)];
                })
            );
        })
    );
