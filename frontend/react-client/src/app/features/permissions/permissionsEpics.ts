import { Action } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { Observable, catchError, map, mergeMap, of } from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {getPermissionsQuery, GetPermissionsQueryResponse} from "./api/permissionQueries";
import { createRequest } from "@time-tracker/shared/misc/RequestCreator";
import { fetchPermissionsFailure, fetchPermissionsSuccess } from "./permissionsSlice";

export const fetchPermissions = () => ({ type: "FETCH_PERMISSIONS", payload: {} });
export const getPermissionsEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType("FETCH_PERMISSIONS"),
    mergeMap(() => {
      return ajax(createRequest(getPermissionsQuery()))
        .pipe(
          map((ajaxResponse: AjaxResponse<GetPermissionsQueryResponse>) => {
            const errors = ajaxResponse.response.errors;
            const data = ajaxResponse.response.data;

            if (errors && errors.length > 0) {
              return fetchPermissionsFailure(errors[0].message);
            }

            return fetchPermissionsSuccess(data.permissionsQuery.availablePermissions);
          }),
          catchError((error) =>
            of(fetchPermissionsFailure(error.message || 'An unexpected error occurred'))
          )
        )
    })
  );