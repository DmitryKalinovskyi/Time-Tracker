import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { createUserRequest, createUserSuccess, createUserFailure } from './userSlice';
import { API_URL } from '../../app/config';
import { User } from './userTypes';

const CREATE_USER_MUTATION = `
    mutation CreateUser($user: UserInput!) {
        userMutation {
            createUser(user: $user) {
                id
                fullName
                email
            }
        }
    }
`;

export const createUserEpic = (action$) =>
    action$.pipe(
        ofType(createUserRequest.type),
        mergeMap(action => {
            return ajax({
                url: `${API_URL}/graphql`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    query: CREATE_USER_MUTATION,
                    variables: { user: action.payload }
                }
            }).pipe(
                map(response => {
                    const user: User = response.response.data.createUser;
                    return createUserSuccess(user);
                }),
                catchError(error => {
                    console.error('Error:', error);
                    return [createUserFailure(error.message)];
                })
            );
        })
    );
