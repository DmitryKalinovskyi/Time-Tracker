This rxjs operators introduced for reducing code duplication.
Consider that epic:
```ts
export const createCalendarEventEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(apiCreateCalendarEvent.type),
    mergeMap((action: PayloadAction<AddCalendarEventInputType>) =>
        apiRequest(createCalendarEventQuery(), {createCalendarEventInput: action.payload}).pipe(
            map((ajaxResponse: AjaxResponse<CreateCalendarEventResponse>) => {
                const errors = ajaxResponse.response.errors;
                const data = ajaxResponse.response.data;
                if (errors && errors.length > 0) {
                    throw new Error(errors[0].message);
                }
                ShowSuccess("Work time added.")
                return addCalendarEvent(data.calendarMutation.createCalendarEvent);
            }),
            catchError((error) => {
                console.log(error)
                ShowFailure("An error occurred while trying to add the calendar event.");
                return of();
            })
        )
    )
);

```

If you look closely, you notice, that there is two main outcomes: error or success.
To prevent duplicated check of that error we use "catchGraphQLError(success, error)"

```ts
export const createCalendarEventEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(apiCreateCalendarEvent.type),
    mergeMap((action: PayloadAction<AddCalendarEventInputType>) =>
        apiRequest(createCalendarEventQuery(), {createCalendarEventInput: action.payload}).pipe(
            catchGraphQLError((ajaxResponse: AjaxResponse<CreateCalendarEventResponse>) => {
                ShowSuccess("Work time added.")
                return addCalendarEvent(ajaxResponse.response.data
                    .calendarMutation.createCalendarEvent);
            }, () => {
                ShowFailure("An error occurred while trying to add the calendar event.");
            })
        )
    )
);

```
