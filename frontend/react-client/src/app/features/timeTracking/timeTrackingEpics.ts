import { catchError, from, map, mergeMap, Observable, of, switchMap, withLatestFrom } from "rxjs";
import { ofType, StateObservable } from "redux-observable";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { addSession, AddSessionPayload, addSessionSuccessful, deleteSession, deleteSessionSuccessful, getCurrentWorkSession, getCurrentWorkSessionSuccessful, getSessions, getSessionsSuccessful, getTodayTotalDurationSuccessful, getTotalDurationByFilters, getWorkSessionsListingTotalDurationSuccessful, setError, startSession, startSuccessful, stopSession, stopSuccessful, updateSession, UpdateSessionPayload, updateSessionSuccessful, WorkSessionPaginationRequest, } from "./timeTrackingSlice";
import { ajax } from "rxjs/ajax";
import { createRequest } from "../../misc/RequestCreator";
import { getCurrentWorkSessionQuery, addSessionQuery, AddSessionResponse, deleteSessionQuery, getWorkSessionsWithPagination, startSessionQuery, StartSessionResponse, stopSessionQuery, StopSessionResponse, updateSessionQuery, UpdateSessionResponse, WorkSessionsWithPaginationResponse, CurrentWorkSessionResponse, getTotalDurationByFiltersQuery, TotalDurationRespone } from "./api/workSessionQueries.ts";
import { RootState } from "../../store.ts";
import FilterCriteria from "../../types/FilterCriteria.ts";
import { WorkSessionFilters } from "../../enums/WorkSessionFilters.ts";
import { SQLOperators } from "../../enums/SQLOperators.ts";


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
    switchMap((action: PayloadAction<WorkSessionPaginationRequest>) => {
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

export const getTotalDurationEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(getTotalDurationByFilters.type),
    mergeMap((action: PayloadAction<Array<FilterCriteria<WorkSessionFilters, SQLOperators>>>) => {
        const request$ = ajax(createRequest(getTotalDurationByFiltersQuery(action.payload)));

        const filterDay = action.payload.find(filter => filter.filterBy == WorkSessionFilters.Day)?.value.toString();
        const filterMonth = action.payload.find(filter => filter.filterBy == WorkSessionFilters.Month)?.value.toString();
        const filterYear = action.payload.find(filter => filter.filterBy == WorkSessionFilters.Year)?.value.toString();
        const today = new Date();

        const isToday = filterDay == today.getUTCDate().toString() && 
                        filterMonth == (today.getUTCMonth() + 1).toString() &&
                        filterYear == today.getUTCFullYear().toString() ;

        return from(request$).pipe(
            map((ajaxResponse: any) => {
                const errors = ajaxResponse.response.errors;
                const data: TotalDurationRespone = ajaxResponse.response.data;

                if (errors && errors.length > 0) {
                    return setError(errors[0].message);
                }

                if (isToday && data && data.timeTrackerQuery && data.timeTrackerQuery.totalDuration) {
                    return getTodayTotalDurationSuccessful(data.timeTrackerQuery.totalDuration);
                }
                else if(!isToday && data && data.timeTrackerQuery && data.timeTrackerQuery.totalDuration)
                {
                    return getWorkSessionsListingTotalDurationSuccessful(data.timeTrackerQuery.totalDuration);
                }
                else {
                    throw new Error('[Getting Total Duration] Unexpected response format or missing login data');
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