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