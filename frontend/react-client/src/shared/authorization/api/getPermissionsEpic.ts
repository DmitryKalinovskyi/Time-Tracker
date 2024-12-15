import {Action} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {mergeMap, Observable} from "rxjs";
import {AjaxResponse} from "rxjs/ajax";
import {getPermissionsQuery, GetPermissionsQueryResponse} from "./permissionQueries.ts";
import {fetchPermissions, fetchPermissionsFailure, fetchPermissionsSuccess} from "../permissionsSlice.ts";
import {apiRequest, catchAnyGraphQLError} from "@time-tracker/shared/graphql/rxjs-operators";

export const getPermissionsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(fetchPermissions.type),
    mergeMap(() =>
        apiRequest(getPermissionsQuery()).pipe(
            catchAnyGraphQLError((ajaxResponse: AjaxResponse<GetPermissionsQueryResponse>) => {
                    const data = ajaxResponse.response.data;

                    return fetchPermissionsSuccess(data.permissionsQuery.availablePermissions);
                },
                (ajaxResponse, error) => fetchPermissionsFailure(error)
            )
        )
    )
);