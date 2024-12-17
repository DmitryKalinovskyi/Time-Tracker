# Best practices
## 1. Context
Context was used as a way to separate modals from component. The key problem to manage nested modals, if you try to do that inside one component, you will loose the context what actually component does.
After context usage, original component became clear and understandable.

before
```tsx
export function Calendar(){
    const openDayModal = (day: Date) => {
        setDay(day);
        setIsDayModalOpen(true);
    };
    
    // tons of methods and handlers
    
    const days = [1, 2, 3];
    return <>
        <CreateEventDialog day={day} open={isCreateEventDialogOpen}/>
        <UpdateEventDialog calendarEvent={calendarEvent} open={isUpdateEventDiagloOpen}/>
        <CalendarModalsContext.Provider value={{openDayModal}}>
            {props.children}
        </CalendarModalsContext.Provider>
        {days.map((day, index) =>
            <DayCell day={day} key={index} onClick={() => openDayModal(day)}/>
        )}
    </>
}
```

after
```tsx
// after
export const CalendarModalsContext = createContext<CalendarModalsContextType>({
    openDayModal: () => {}
});

export function CalendarModalsProvider(props: CalendarModalsProviderProps) {
    const openDayModal = (day: Date) => {
        setDay(day);
        setIsDayModalOpen(true);
    };
    /// ...

    return <>
        <CreateEventDialog day={day} open={isCreateEventDialogOpen}/>
        <UpdateEventDialog calendarEvent={calendarEvent} open={isUpdateEventDiagloOpen}/>
        <CalendarModalsContext.Provider value={{openDayModal}}>
            {props.children}
        </CalendarModalsContext.Provider>
    </>
}

// and then use in original component
export function Calendar(){
    const {openDayModal} = useContext(CalendarModalsContext);
    
    const days = [1, 2, 3];    
    return <>
        {days.map((day, index) =>
            <DayCell day={day} key={index} onClick={() => openDayModal(day)}/>
        )}
    </>
}
```

## 2. Hooks, hooks and hooks.
I think hooks very help in developing react application, it also considered as best practice. Here is example of a few really cool hooks 
```ts
export default function useIsHavePermission(permission: string){
    const auth = useAuth();

    if(auth.user === null) return false;

    return auth.user.permissions.includes(permission);
}
```

```ts
export const useTimeTracker = () => {
    const currentWorkSession = useSelector((state: RootState) => state.timeTracker.currentWorkSession);

    const isTracking = currentWorkSession != null;

    const [duration, setDuration] = useState(0);

    useEffect(() => {
        // super complex observable based logic to
        // find elapsed time from beggining of session,
        // with sync in ms
        
        // also this hook was inspired by negative duration
        // issue when DataBase was hosted in azure.
        
    }, [isTracking, currentWorkSession]);

    return {duration, isTracking};
};
```
## 3. Redux-Observable and side effects
Part from Redux-Thunk docs: `
It's common to have logic directly in components, such as making an async request in a click handler or a useEffect hook and then processing the results. However, it's often necessary to move as much of that logic as possible outside the UI layer`.

Probably you know Redux-Thunk library. Redux-Observable can be considered as improvement. Instead of standard Promises for request or another async logic is common to use Observables.

Redux-Observable introduce new middlewares called epics, they handle stream of react actions and produce new actions.

Epic
```ts
export const startSessionEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(startSession.type),
    mergeMap(() =>
        apiRequest(startSessionQuery()).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => startSessionSuccessful(ajaxResponse.response.data.timeTrackerMutation.startSession),
                (ajaxResponse, error) => startSessionFailure(error)
            )
        )
    )
);
```
There are many benefits, you can produce some action in intervals, with any delay with any mapping and etc. 
Also, you can trigger to different actions depending on different conditions.

```ts
// update our session page, when any filtering happens,
// session relatd updates etc.
export const getWorkSessionsEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(getWorkSessions.type,
        setWorkSessionsPage.type,
        startSessionSuccessful.type,
        stopSessionSuccessful.type,
        addWorkSessionSuccessful.type,
        updateWorkSessionSuccessful.type,
        deleteWorkSessionSuccess.type,
        applyTimeTrackerFilter.type,
    ),
    switchMap(() => {
        const filterQueryBuilder = new WorkSessionsInputBuilder(state$.value);
        const variables = filterQueryBuilder
            .attachSelectedUser()
            .attachSelectedDay()
            .attachSelectedOrigins()
            .sortByStartTime()
            .build()

        return apiRequest(getWorkSessionsQuery(), variables).pipe(
            catchAnyGraphQLError(
                (ajaxResponse) => getWorkSessionsSuccessful(ajaxResponse.response.data.timeTrackerQuery.workSessions),
                (ajaxResponse, error) => getWorkSessionsFailure(error)
            )
        )
    })
);
```
```ts
// repeatly refresh token in some interval 
export const beginRefreshTokenEpic: Epic<Action, Action, RootState> = (action$: Observable<Action>, state$: StateObservable<RootState>) => action$.pipe(
    ofType(refreshToken.type, loginSuccess.type),
    switchMap(() => of(beginRefreshToken()).pipe(
            delay(getAccessTokenRefreshDelay(state$.value.auth.accessToken.dateExpires)),
            tap(() => console.log('Access token expired. We need to make request with our refresh to receive new access.')),
        ) as Observable<Action>
    )
)
```

## 4. Route guards
Sometimes we need to restrict access to the different pages, based some user status (permissions for example). For that we write specials components guards. They reduce boilerplate and allow to write declarative routing.

```tsx
export default function RequirePermission({permission}: {permission: string}){
    const isHavePermission = useIsHavePermission(permission);
    return isHavePermission? <Outlet/> : <UnauthorizedPage/>
}

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFoundPage/>,
        children: [
            {
                element: <Authenticated/>,
                children: [
                    {
                        element: <Root/>, children: [
                            {path: "/", element: <TimeTrackerPage/>},
                            {path: "/home", element: <TimeTrackerPage/>},
                            {path: "/users", element: <UsersPage/>},
                            {path: "/user/:UserId", element: <UserPage/>},
                            {
                                element: <RequirePermission permission={ManageUsersPermission}/>, children: [
                                    {path: "/create-user", element: <CreateUserPage/>},
                                ]
                            },
                            {path: "/calendar", element: <CalendarPage/>},
                            {
                                element: <RequirePermission permission={MakeWorkReportsPermission}/>, children: [
                                    {path: "/workers-time", element: <WorkReportsPage/>}
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                element: <Unauthenticated to={"/"}/>, children: [
                    {path: "/login", element: <LoginPage/>},
                    {path: "/verification", element: <AccountVerificationPage/>},
                    {path: "/reset", element: <ResetPasswordPage/>}
                ]
            }
        ]
    }
])
```

## 5. Yup and Formik
Forms and form validation are crucial part in the almost any project. Best practice is to use popular library for that, because that improves readability and reduces boilerplate.
```tsx
export function CreateUserPage() {
    const {error, loading, success} = useSelector((state: RootState) => state.createUser);
    const dispatch = useDispatch();

    const validationScheme = object({
        fullName: getFullNameValidation().required(),
        email: getEmailValidation().required(),
        position: getPositionValidation().required(),
        workHoursPerMonth: getWorkHoursPerMonthValidation().required(),
    })

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            position: "",
            workHoursPerMonth: 160
        },
        validationSchema: validationScheme,
        onSubmit: (values) => {
            dispatch(createUser({
                fullName: values.fullName,
                email: values.email,
                position: values.position,
                workHoursPerMonth: values.workHoursPerMonth
            }))
        }
    })
    
    return <>
        <form onSubmit={formik.handleSubmit}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="fullName"
                autoFocus
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
            />
            {/*...*/}
        </form>    
    </>
    
}
```

## 6. Key + Map
Attribute key is a great point for optimization, especially when you have much data. 

```tsx

{eventsInThatDay.map((calendarEvent) => <Chip key={calendarEvent.id}
    color="primary"
    size="small"
    sx={{width: "90%", marginTop: 1}}
    label={formatEvent(calendarEvent)}/>)}
```




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Developing rules

### Rxjs
- Epics always produce actions from actions.
- Each epic located in separate file. 
- Feature related epics should be combined before use in store.
- Introduce new rxjs operator or util function when you see duplication.
- For api calls actions should return success or failure (probably more)

### Structure
- each page folder should have index.ts
- index should export page, state reducer, epic (if present).  