import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { Observable, catchError, map, mergeMap, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { getPermissionsQuery } from "../../../api/queries/permissionQueries";
import { createRequest } from "../../misc/RequestCreator";
import { fetchPermissionsFailure, fetchPermissionsSuccess } from "./permissionsSlice";

export const fetchPermissions = () => ({ type: "FETCH_PERMISSIONS", payload: {} });
export const getPermissionsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType("FETCH_PERMISSIONS"),
    mergeMap(() => {
      return ajax(createRequest(getPermissionsQuery()))
        .pipe(
          map((ajaxResponse: any) => {
            const errors = ajaxResponse.response.errors;
            const data = ajaxResponse.response.data;

            if (errors && errors.length > 0) {
              return fetchPermissionsFailure(errors[0].message);
            }
            if (data && data.permissionsQuery.availablePermissions) {
              return fetchPermissionsSuccess(data.permissionsQuery.availablePermissions);
            } else {
              throw new Error('[FETCH_PERMISSIONS] Unexpected response format or missing user data');
            }
          }),
          catchError((error: any) =>
            of(fetchPermissionsFailure(error.message || 'An unexpected error occurred'))
          )
        )
    })
  );