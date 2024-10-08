import {combineEpics} from "redux-observable";
import {startSessionEpic} from "./epics/startSessionEpic.ts";
import {stopSessionEpic} from "./epics/stopSessionEpic.ts";
import {deleteSessionEpic} from "./epics/deleteSessionEpic.ts";
import {getCurrentWorkSessionEpic} from "./epics/getCurrentWorkSessionEpic.ts";

export const timeTrackingEpics = combineEpics(
    startSessionEpic,
    stopSessionEpic,
    deleteSessionEpic,
    getCurrentWorkSessionEpic
);
// export const getSessionsEpic = (action$: Observable<Action>) => action$.pipe(
//     ofType(getSessions.type),
//     switchMap((action: PayloadAction<PaginatedRequest>) => {
//         const request$ = ajax(createRequest(getWorkSessionsWithPagination(action.payload)));
//
//         return from(request$).pipe(
//             map((ajaxResponse: any) => {
//                 const errors = ajaxResponse.response.errors;
//                 const data: WorkSessionsWithPaginationResponse = ajaxResponse.response.data;
//
//                 if (errors && errors.length > 0) {
//                     return setError(errors[0].message);
//                 }
//
//                 if (data && data.timeTrackerQuery && data.timeTrackerQuery.workSessions) {
//                     return getSessionsSuccessful(data.timeTrackerQuery.workSessions);
//                 } else {
//                     throw new Error('[Getting Work Sessions] Unexpected response format or missing login data');
//                 }
//             }),
//             catchError((error: any) => {
//                 let errorMessage = 'An unexpected error occurred';
//
//                 if (error.status === 0) {
//                     errorMessage = 'Connection time out';
//                 } else if (error.message) {
//                     errorMessage = error.message;
//                 }
//
//                 return of(setError(errorMessage));
//             })
//         );
//     })
// );
//

// export const getWorkSessionsListingTotalDurationEpic = (action$: Observable<Action>) => action$.pipe(
//     ofType(getWorkSessionsListingTotalDuration.type),
//     switchMap((action: PayloadAction<Array<FilterCriteria>>) => {
//         const request$ = ajax(createRequest(getTotalDurationByFiltersQuery(action.payload)));
//
//         return from(request$).pipe(
//             map((ajaxResponse: any) => {
//                 const errors = ajaxResponse.response.errors;
//                 const data: TotalDurationRespone = ajaxResponse.response.data;
//
//                 if (errors && errors.length > 0) {
//                     return setError(errors[0].message);
//                 }
//                 if(data && data.timeTrackerQuery && data.timeTrackerQuery.totalDuration != null)
//                 {
//                     return getWorkSessionsListingTotalDurationSuccessful(data.timeTrackerQuery.totalDuration);
//                 }
//                 else {
//                     throw new Error('[Getting Total Duration For Listing] Unexpected response format or missing login data');
//                 }
//             }),
//             catchError((error: any) => {
//                 let errorMessage = 'An unexpected error occurred';
//
//                 if (error.status === 0) {
//                     errorMessage = 'Connection time out';
//                 } else if (error.message) {
//                     errorMessage = error.message;
//                 }
//
//                 return of(setError(errorMessage));
//             })
//         );
//     })
// );
//
// export const getTodayTotalDurationEpic = (action$: Observable<Action>) => action$.pipe(
//     ofType(getTodayTotalDuration.type),
//     switchMap((action: PayloadAction<number>) => {
//         const request$ = ajax(createRequest(getTodayTotalDurationByUserIdQuery(action.payload)));
//
//         return from(request$).pipe(
//             map((ajaxResponse: any) => {
//                 const errors = ajaxResponse.response.errors;
//                 const data: TotalDurationRespone = ajaxResponse.response.data;
//
//                 if (errors && errors.length > 0) {
//                     return setError(errors[0].message);
//                 }
//                 if(data && data.timeTrackerQuery && data.timeTrackerQuery.totalDuration != null)
//                 {
//                     return getTodayTotalDurationSuccessful(data.timeTrackerQuery.totalDuration);
//                 }
//                 else {
//                     throw new Error('[Getting Today Total Duration By Id] Unexpected response format or missing login data');
//                 }
//             }),
//             catchError((error: any) => {
//                 let errorMessage = 'An unexpected error occurred';
//
//                 if (error.status === 0) {
//                     errorMessage = 'Connection time out';
//                 } else if (error.message) {
//                     errorMessage = error.message;
//                 }
//
//                 return of(setError(errorMessage));
//             })
//         );
//     })
// );
//
// export const updateSessionEpic = (action$: Observable<Action>) => action$.pipe(
//     ofType(updateSession.type),
//     switchMap((action: PayloadAction<UpdateSessionPayload>) =>
//         from(
//             ajax(createRequest(updateSessionQuery(action.payload)))
//                 .pipe(
//                     map((ajaxResponse: any) => {
//                         console.log(ajaxResponse.data)
//                         const errors = ajaxResponse.response.errors;
//                         const data: UpdateSessionResponse = ajaxResponse.response.data;
//
//                         if (errors && errors.length > 0) {
//                             return setError(errors[0].message);
//                         }
//
//                         if (data && data.timeTrackerMutation && data.timeTrackerMutation.updateSession) {
//                             return updateSessionSuccessful(data.timeTrackerMutation.updateSession);
//                         } else {
//                             throw new Error('[Session updating] Unexpected response format or missing login data');
//                         }
//                     }),
//                     catchError((error: any) => {
//                         let errorMessage = 'An unexpected error occurred';
//
//                         if (error.status === 0) {
//                             errorMessage = 'Connection time out';
//                         } else if (error.message) {
//                             errorMessage = error.message;
//                         }
//
//                         return of(setError(errorMessage));
//                     })
//                 )
//             )
//     )
// );
//

//
// export const deleteSessionSuccessfullEpic = (action$: Observable<Action>, state$: Observable<RootState>) => action$.pipe(
//     ofType(deleteSessionSuccessful.type),
//     withLatestFrom(state$),
//     map(([_action, state]: [any, RootState]) =>
//         getSessions(getCurrentPagArgs(state.timeTracker.paginationInfo!,
//             state.timeTracker.sorts,
//             state.timeTracker.filters!
//     )))
// );
//
//
// export const addSessionEpic = (action$: Observable<Action>) => action$.pipe(
//     ofType(addSession.type),
//     switchMap((action: PayloadAction<AddSessionPayload>) =>
//         from(
//             ajax(createRequest(addSessionQuery(action.payload)))
//                 .pipe(
//                     map((ajaxResponse: any) => {
//                         console.log(ajaxResponse.data)
//                         const errors = ajaxResponse.response.errors;
//                         const data: AddSessionResponse = ajaxResponse.response.data;
//
//                         if (errors && errors.length > 0) {
//                             return setError(errors[0].message);
//                         }
//
//                         if (data && data.timeTrackerMutation && data.timeTrackerMutation.addSession) {
//                             return addSessionSuccessful(data.timeTrackerMutation.addSession);
//                         } else {
//                             throw new Error('[Session adding] Unexpected response format or missing login data');
//                         }
//                     }),
//                     catchError((error: any) => {
//                         let errorMessage = 'An unexpected error occurred';
//
//                         if (error.status === 0) {
//                             errorMessage = 'Connection time out';
//                         } else if (error.message) {
//                             errorMessage = error.message;
//                         }
//
//                         return of(setError(errorMessage));
//                     })
//                 )
//             )
//     )
// );