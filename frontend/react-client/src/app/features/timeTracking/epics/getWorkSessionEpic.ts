
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