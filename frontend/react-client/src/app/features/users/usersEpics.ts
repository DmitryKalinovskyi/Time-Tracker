import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";
import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { createRequest } from "@time-tracker/shared/misc/RequestCreator";
import {getUsersQuery, GetUsersQueryResponseType} from "./api/usersQueries";
import { fetchUsersFailure, fetchUsersSuccess } from "./usersSlice";

export interface FetchUsersPayload {
    pageNumber: number,
    pageSize: number,
}

export const fetchUsers = (fetchUsersPayload: FetchUsersPayload) => ({ type: "FETCH_USERS", payload: fetchUsersPayload });
export const getUsersEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType("FETCH_USERS"),
    mergeMap((action: PayloadAction<FetchUsersPayload>) => {
      return ajax(createRequest(getUsersQuery(),
        {
            "input": action.payload
        }))
        .pipe(
          map((ajaxResponse: AjaxResponse<GetUsersQueryResponseType>) => {
              const response = ajaxResponse.response;
            console.log(response);

            if (response.errors && response.errors.length > 0) {
              return fetchUsersFailure(response.errors[0].message);
            }

              return fetchUsersSuccess(response);
          }),
          catchError((error: any) =>{
            return of(fetchUsersFailure(error.message || 'An unexpected error occurred'))
          }
          )
        )
    })
  );