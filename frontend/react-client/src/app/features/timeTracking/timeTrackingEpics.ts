import { catchError, from, map, Observable, of, switchMap, withLatestFrom } from "rxjs";
import { ofType, StateObservable } from "redux-observable";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { getSessions, getSessionsSuccessful, PaginationPayload, setError, startSession, startSuccessful, stopSession, stopSuccessful, } from "./timeTrackingSlice";
import { ajax } from "rxjs/ajax";
import { createRequest } from "../../misc/RequestCreator";
import { getWorkSessionsWithPagination, startSessionQuery, StartSessionResponse, stopSessionQuery, StopSessionResponse, WorkSessionsWithPaginationResponse } from "../../../api/queries/workSessionQueries";
import { RootState } from "../../store.ts";


export const startSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(startSession.type),
    switchMap((action: PayloadAction<number>) =>
        from(
            ajax(createRequest(startSessionQuery(action.payload)))
                .pipe(
                    map((ajaxResponse: any) => {
                        console.log(ajaxResponse.data)
                        const errors = ajaxResponse.response.errors;
                        const data: StartSessionResponse = ajaxResponse.response.data;
        
                        if (errors && errors.length > 0) {
                            return setError(errors[0].message);
                        }
        
                        if (data && data.timeTrackerMutation && data.timeTrackerMutation.startSession) {
                            return startSuccessful(data.timeTrackerMutation.startSession.id);
                        } else {
                            throw new Error('[Session starting] Unexpected response format or missing login data');
                        }
                    }),
                    catchError((error: any) => {
                        let errorMessage = 'An unexpected error occurred';

                        if (error.status === 0) {
                            errorMessage = 'Connection time out';
                        } else if (error.message) {
                            errorMessage = error.message;
                        }

                        return of(setError(errorMessage));
                    })
                )
            )
    )
);


export const stopSessionEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(stopSession.type),
    withLatestFrom(state$),
    switchMap(([_action, state]) => {
        const currentSessionId = state.timeTracker.currentSessionId;
        if (currentSessionId === null) 
            return of(setError('No current session ID available.'));

        const request$ = ajax(createRequest(stopSessionQuery(currentSessionId)));

        return from(request$).pipe(
            map((ajaxResponse: any) => {
                console.log(ajaxResponse.data);
                const errors = ajaxResponse.response.errors;
                const data: StopSessionResponse = ajaxResponse.response.data;

                if (errors && errors.length > 0) {
                    return setError(errors[0].message);
                }

                if (data && data.timeTrackerMutation && data.timeTrackerMutation.stopSession) {
                    return stopSuccessful(data.timeTrackerMutation.stopSession);
                } else {
                    throw new Error('[Session stoping] Unexpected response format or missing login data');
                }
            }),
            catchError((error: any) => {
                let errorMessage = 'An unexpected error occurred';

                if (error.status === 0) {
                    errorMessage = 'Connection time out';
                } else if (error.message) {
                    errorMessage = error.message;
                }

                return of(setError(errorMessage));
            })
        );
    })
);


export const getSessionsEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(getSessions.type),
    switchMap((action: PayloadAction<PaginationPayload>) => {
        const request$ = ajax(createRequest(getWorkSessionsWithPagination(action.payload)));

        return from(request$).pipe(
            map((ajaxResponse: any) => {
                console.log(ajaxResponse.data);
                const errors = ajaxResponse.response.errors;
                const data: WorkSessionsWithPaginationResponse = ajaxResponse.response.data;

                if (errors && errors.length > 0) {
                    return setError(errors[0].message);
                }

                if (data && data.timeTrackerQuery && data.timeTrackerQuery.workSessions) {
                    return getSessionsSuccessful(data.timeTrackerQuery.workSessions);
                } else {
                    throw new Error('[Getting Work Sessions] Unexpected response format or missing login data');
                }
            }),
            catchError((error: any) => {
                let errorMessage = 'An unexpected error occurred';

                if (error.status === 0) {
                    errorMessage = 'Connection time out';
                } else if (error.message) {
                    errorMessage = error.message;
                }

                return of(setError(errorMessage));
            })
        );
    })
);
