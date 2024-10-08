import { catchError, from, map, Observable, of, switchMap, withLatestFrom } from "rxjs";
import { ofType, StateObservable } from "redux-observable";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { addSession, AddSessionPayload, addSessionSuccessful, deleteSession, deleteSessionSuccessful, getCurrentWorkSession, getCurrentWorkSessionSuccessful, getSessions, getSessionsSuccessful, getTodayTotalDuration, getTodayTotalDurationSuccessful, getWorkSessionsListingTotalDuration, getWorkSessionsListingTotalDurationSuccessful, setError, startSession, startSuccessful, stopSession, stopSuccessful, updateSession, UpdateSessionPayload, updateSessionSuccessful, } from "./timeTrackingSlice";
import { ajax } from "rxjs/ajax";
import { createRequest } from "../../misc/RequestCreator";
import { getCurrentWorkSessionQuery, addSessionQuery, AddSessionResponse, deleteSessionQuery, getWorkSessionsWithPagination, startSessionQuery, StartSessionResponse, stopSessionQuery, StopSessionResponse, updateSessionQuery, UpdateSessionResponse, WorkSessionsWithPaginationResponse, CurrentWorkSessionResponse, getTotalDurationByFiltersQuery, TotalDurationRespone, getTodayTotalDurationByUserIdQuery } from "./api/workSessionQueries.ts";
import { RootState } from "../../store.ts";
import FilterCriteria from "../../types/FilterCriteria.ts";
import PaginatedRequest from "../../types/PaginatedRequest.ts";
import { getCurrentPagArgs } from "../../misc/PaginationHelper.ts";


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
                            return startSuccessful(data.timeTrackerMutation.startSession);
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
        const currentSessionId = state.timeTracker.currentSession!.id;
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
    switchMap((action: PayloadAction<PaginatedRequest>) => {
        const request$ = ajax(createRequest(getWorkSessionsWithPagination(action.payload)));

        return from(request$).pipe(
            map((ajaxResponse: any) => {
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

export const getCurrentSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(getCurrentWorkSession.type),
    switchMap((action: PayloadAction<number>) => {
        const request$ = ajax(createRequest(getCurrentWorkSessionQuery(action.payload)));

        return from(request$).pipe(
            map((ajaxResponse: any) => {
                const errors = ajaxResponse.response.errors;
                const data: CurrentWorkSessionResponse = ajaxResponse.response.data;

                if (errors && errors.length > 0) {
                    return setError(errors[0].message);
                }

                return getCurrentWorkSessionSuccessful(data.timeTrackerQuery.currentWorkSession);
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

export const getWorkSessionsListingTotalDurationEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(getWorkSessionsListingTotalDuration.type),
    switchMap((action: PayloadAction<Array<FilterCriteria>>) => {
        const request$ = ajax(createRequest(getTotalDurationByFiltersQuery(action.payload)));

        return from(request$).pipe(
            map((ajaxResponse: any) => {
                const errors = ajaxResponse.response.errors;
                const data: TotalDurationRespone = ajaxResponse.response.data;

                if (errors && errors.length > 0) {
                    return setError(errors[0].message);
                }
                if(data && data.timeTrackerQuery && data.timeTrackerQuery.totalDuration != null)
                {
                    return getWorkSessionsListingTotalDurationSuccessful(data.timeTrackerQuery.totalDuration);
                }
                else {
                    throw new Error('[Getting Total Duration For Listing] Unexpected response format or missing login data');
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

export const getTodayTotalDurationEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(getTodayTotalDuration.type),
    switchMap((action: PayloadAction<number>) => {
        const request$ = ajax(createRequest(getTodayTotalDurationByUserIdQuery(action.payload)));

        return from(request$).pipe(
            map((ajaxResponse: any) => {
                const errors = ajaxResponse.response.errors;
                const data: TotalDurationRespone = ajaxResponse.response.data;

                if (errors && errors.length > 0) {
                    return setError(errors[0].message);
                }
                if(data && data.timeTrackerQuery && data.timeTrackerQuery.totalDuration != null)
                {
                    return getTodayTotalDurationSuccessful(data.timeTrackerQuery.totalDuration);
                }
                else {
                    throw new Error('[Getting Today Total Duration By Id] Unexpected response format or missing login data');
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

export const updateSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(updateSession.type),
    switchMap((action: PayloadAction<UpdateSessionPayload>) =>
        from(
            ajax(createRequest(updateSessionQuery(action.payload)))
                .pipe(
                    map((ajaxResponse: any) => {
                        console.log(ajaxResponse.data)
                        const errors = ajaxResponse.response.errors;
                        const data: UpdateSessionResponse = ajaxResponse.response.data;
        
                        if (errors && errors.length > 0) {
                            return setError(errors[0].message);
                        }
        
                        if (data && data.timeTrackerMutation && data.timeTrackerMutation.updateSession) {
                            return updateSessionSuccessful(data.timeTrackerMutation.updateSession);
                        } else {
                            throw new Error('[Session updating] Unexpected response format or missing login data');
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

export const deleteSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(deleteSession.type),
    switchMap((action: PayloadAction<number>) =>
        from(
            ajax(createRequest(deleteSessionQuery(action.payload)))
                .pipe(
                    map((ajaxResponse: any) => {
                        console.log(ajaxResponse.data)
                        const errors = ajaxResponse.response.errors;
                        const data: any = ajaxResponse.response.data;
        
                        if (errors && errors.length > 0) {
                            return setError(errors[0].message);
                        }
        
                        if (data && data.timeTrackerMutation && data.timeTrackerMutation.deleteSession) {
                            return deleteSessionSuccessful(action.payload);
                        } else {
                            throw new Error('[Session deleting] Unexpected response format or missing login data');
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

export const deleteSessionSuccessfullEpic = (action$: Observable<Action>, state$: Observable<RootState>) => action$.pipe(
    ofType(deleteSessionSuccessful.type),
    withLatestFrom(state$),
    map(([_action, state]: [any, RootState]) => 
        getSessions(getCurrentPagArgs(state.timeTracker.paginationInfo!,
            state.timeTracker.sorts,
            state.timeTracker.filters!
    )))
);


export const addSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(addSession.type),
    switchMap((action: PayloadAction<AddSessionPayload>) =>
        from(
            ajax(createRequest(addSessionQuery(action.payload)))
                .pipe(
                    map((ajaxResponse: any) => {
                        console.log(ajaxResponse.data)
                        const errors = ajaxResponse.response.errors;
                        const data: AddSessionResponse = ajaxResponse.response.data;
        
                        if (errors && errors.length > 0) {
                            return setError(errors[0].message);
                        }
        
                        if (data && data.timeTrackerMutation && data.timeTrackerMutation.addSession) {
                            return addSessionSuccessful(data.timeTrackerMutation.addSession);
                        } else {
                            throw new Error('[Session adding] Unexpected response format or missing login data');
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