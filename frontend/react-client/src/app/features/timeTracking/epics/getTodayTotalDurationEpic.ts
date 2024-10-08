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
