import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { createRequest } from "../../misc/RequestCreator";
import { getUsersQuery } from "./api/usersQueries";
import { fetchUsersFailure, fetchUsersSuccess } from "./usersSlice";

export interface FetchUsersPayload {
  first: number | null,
  after: string | null
  last: number | null,
  before: string | null
}

export const fetchUsers = (fetchUsersPayload: FetchUsersPayload) => ({ type: "FETCH_USERS", payload: fetchUsersPayload });
export const getUsersEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType("FETCH_USERS"),
    mergeMap((action: PayloadAction<FetchUsersPayload>) => {
      return ajax(createRequest(getUsersQuery(),
        {
          "first": action.payload.first,
          "after": action.payload.after,
          "last": action.payload.last,
          "before": action.payload.before,
        }))
        .pipe(
          map((ajaxResponse: any) => {
            const errors = ajaxResponse.response.errors;
            const data = ajaxResponse.response.data;

            if (errors && errors.length > 0) {
              return fetchUsersFailure(errors[0].message);
            }
            if (data && data.usersQuery.users) {
              return fetchUsersSuccess(data.usersQuery.users);
            } else {
              throw new Error('[FETCH_USERS] Unexpected response format or missing user data');
            }
          }),
          catchError((error: any) =>
            of(fetchUsersFailure(error.message || 'An unexpected error occurred'))
          )
        )
    })
  );