import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { createRequest } from "../../misc/RequestCreator";
import { getUserQuery } from "../../../api/queries/userQueries";
import { fetchUserFailure, fetchUserSuccess } from "./userSlice";

export const fetchUser = (userId: number) => ({ type: "FETCH_USER", payload: userId });
export const getUserEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType("FETCH_USER"),
    mergeMap((action: PayloadAction<number>) => {
      return ajax(createRequest(getUserQuery(),
        {
          "userId": action.payload
        }))
        .pipe(
          map((ajaxResponse: any) => {
            const errors = ajaxResponse.response.errors;
            const data = ajaxResponse.response.data;

            console.log(data);
            if (errors && errors.length > 0) {
              return fetchUserFailure(errors[0].message);
            }
            if (data && data.usersQuery.user) {
              return fetchUserSuccess(data.usersQuery.user);
            } else {
              throw new Error('[FETCH_USERS] Unexpected response format or missing user data');
            }
          }),
          catchError((error: any) =>
            of(fetchUserFailure(error.message || 'An unexpected error occurred'))
          )
        )
    })
  );