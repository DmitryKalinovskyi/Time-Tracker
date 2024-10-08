
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