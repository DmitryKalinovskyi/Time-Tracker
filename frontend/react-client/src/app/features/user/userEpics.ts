import { PayloadAction } from "@reduxjs/toolkit";
import { catchError, map, mapTo, mergeMap, Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { createRequest } from "../../misc/RequestCreator";
import { getUserQuery, updateUserActiveStatusMutation, updateUserMutation } from "../../../api/queries/userQueries";
import { fetchUserFailure, fetchUserSuccess } from "./userSlice";
import { ShowFailure, ShowSuccess } from "../../misc/SnackBarHelper";

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

            if (errors && errors.length > 0) {
              return fetchUserFailure(errors[0].message);
            }
            if (data.usersQuery.user == null) {
              return fetchUserFailure("User not found");
            }
            if (data && data.usersQuery.user) {
              return fetchUserSuccess(data.usersQuery.user);
            }
          }),
          catchError((error: any) =>
            of(fetchUserFailure(error.message || 'An unexpected error occurred'))
          )
        )
    })
  );

export interface UpdateUserPayload {
  id: number,
  fullName: string,
  email: string
}

export const updateUser = (user: UpdateUserPayload) => ({ type: "UPDATE_USER", payload: user });
export const updateUserEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType("UPDATE_USER"),
    mergeMap((action: PayloadAction<UpdateUserPayload>) => {
      return ajax(createRequest(updateUserMutation(),
        {
          "id": action.payload.id,
          "fullName": action.payload.fullName,
          "email": action.payload.email
        }))
        .pipe(
          mergeMap((ajaxResponse: any) => {
            const errors = ajaxResponse.response.errors;
            const data = ajaxResponse.response.data;

            if (errors && errors.length > 0) {
              throw new Error(errors[0].message);
            }
            if (data && data.userMutation) {
              ShowSuccess(data.userMutation.updateUser);
              return of(fetchUser(action.payload.id));
            }
            return of();
          }),
          catchError((error: any) =>
            of(ShowFailure(error.message || 'An unexpected error occurred'))
          )
        )
    })
  );



export interface UpdateUserActiveStatusPayload {
  id: number,
  isActive: boolean
}

export const updateUserActiveStatus = (user: UpdateUserActiveStatusPayload) => ({ type: "UPDATE_USER_ACTIVE_STATUS", payload: user });
export const updateUserActiveStatusEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType("UPDATE_USER_ACTIVE_STATUS"),
    mergeMap((action: PayloadAction<UpdateUserActiveStatusPayload>) => {
      return ajax(createRequest(updateUserActiveStatusMutation(),
        {
          "id": action.payload.id,
          "isActive": action.payload.isActive
        }))
        .pipe(
          mergeMap((ajaxResponse: any) => {
            const errors = ajaxResponse.response.errors;
            const data = ajaxResponse.response.data;

            if (errors && errors.length > 0) {
              throw new Error(errors[0].message);
            }
            if (data && data.userMutation) {
              ShowSuccess(data.userMutation.updateUserActiveSatus);
              return of(fetchUser(action.payload.id));
            }
            return of();
          }),
          catchError((error: any) =>
            of(ShowFailure(error.message || 'An unexpected error occurred'))
          )
        )
    })
  );