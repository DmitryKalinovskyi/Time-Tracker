import {catchError, from, map, mergeMap, Observable, of, tap} from "rxjs";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {ofType} from "redux-observable";
import {ajax} from "rxjs/ajax";
import {createRequest} from "../../misc/RequestCreator.ts";
import {
    addRole,
    addRoleSuccess, getRoles, getRolesSuccess,
    removeRole,
    removeRoleSuccess,
    roleFailure,
    updateRole,
    updateRoleSuccess
} from "./rolesSlice.ts";
import Role from "../../types/Role.ts";
import {
    createRoleQuery,
    createRoleResponse,
    deleteRoleQuery,
    deleteRoleResponse,
    getRolesAndPermissionsQuery,
    getRolesAndPermissionsResponse,
    updateRoleQuery,
    updateRoleResponse
} from "../../../api/queries/roleQueries.ts";

export const getRolesEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(getRoles.type),
    mergeMap((action: PayloadAction) =>
        from(
            ajax(createRequest(getRolesAndPermissionsQuery()))
                .pipe(
                    map((ajaxResponse: any) => {
                        const data: getRolesAndPermissionsResponse = ajaxResponse.response.data;

                        if (data && data.rolesQuery && data.rolesQuery.roles
                            && data.permissionsQuery && data.permissionsQuery.availablePermissions) {
                            return getRolesSuccess({roles: data.rolesQuery.roles, permissions: data.permissionsQuery.availablePermissions});
                        } else {
                            throw new Error('[ROLES] Unexpected response format');
                        }
                    }),
                    catchError((error) => {
                            const errors = error.response.errors;
                            if (errors && errors.length > 0) {
                                if(errors[0].extensions.code == "auth-required")
                                    return of(roleFailure("Authorization is required."))
                            }

                            return of(roleFailure(error.message || 'An unexpected error occurred'))
                        }
                    )
                )
        )
    )
);

export const addRoleEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(addRole.type),
    mergeMap((action: PayloadAction<{ name: string, permissions: string[]}>) =>
        from(
            ajax(createRequest(createRoleQuery(), {role: {name: action.payload.name, permissions: action.payload.permissions}}))
            .pipe(
                map((ajaxResponse: any) => {
                    const data: createRoleResponse = ajaxResponse.response.data;

                    if (data && data.rolesMutation && data.rolesMutation.createRole) {
                        return addRoleSuccess(data.rolesMutation.createRole);
                    } else {
                        throw new Error('[ROLES] Unexpected response format');
                    }
                }),
                catchError((error) => {
                    console.log(error)
                        const errors = error.response.errors;
                        if (errors && errors.length > 0) {
                            if(errors[0].extensions.code == "auth-required")
                               return of(roleFailure("Authorization is required."))
                        }

                        return of(roleFailure(error.message || 'An unexpected error occurred'))
                    }
                )
            )
        )
    )
);

export const updateRoleEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(updateRole.type),
    mergeMap((action: PayloadAction<Role>) =>
        from(
            ajax(createRequest(updateRoleQuery(), {role: action.payload}))
                .pipe(
                    map((ajaxResponse: any) => {
                        const data: updateRoleResponse = ajaxResponse.response.data;
                        if (data && data.rolesMutation && data.rolesMutation.updateRole) {
                            return updateRoleSuccess(data.rolesMutation.updateRole);
                        } else {
                            throw new Error('[ROLES] Unexpected response format');
                        }
                    }),
                    catchError((error) => {
                            console.log(error)
                            const errors = error.response.errors;
                            if (errors && errors.length > 0) {
                                if(errors[0].extensions.code == "auth-required")
                                    return of(roleFailure("Authorization is required."))
                            }

                            return of(roleFailure(error.message || 'An unexpected error occurred'))
                        }
                    )
                )
        )
    )
);

export const deleteRoleEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(removeRole.type),
    mergeMap((action: PayloadAction<number>) =>
        from(
            ajax(createRequest(deleteRoleQuery(action.payload)))
                .pipe(
                    map((ajaxResponse: any) => {
                        const data: deleteRoleResponse = ajaxResponse.response.data;

                        if (data && data.rolesMutation && data.rolesMutation.deleteRole) {
                            return removeRoleSuccess(action.payload);
                        } else {
                            throw new Error('[ROLES] Unexpected response format');
                        }
                    }),
                    catchError((error) => {
                            const errors = error.response.errors;
                            if (errors && errors.length > 0) {
                                if(errors[0].extensions.code == "auth-required")
                                    return of(roleFailure("Authorization is required."))
                            }

                            return of(roleFailure(error.message || 'An unexpected error occurred'))
                        }
                    )
                )
        )
    )
);