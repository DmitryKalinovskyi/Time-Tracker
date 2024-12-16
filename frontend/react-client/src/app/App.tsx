import { SnackbarProvider } from 'notistack';
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authenticated from "@time-tracker/shared/authentication/guards/Authenticated.tsx";
import { store } from "./store.ts";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import RequirePermission from "@time-tracker/shared/authentication/guards/RequirePermission.tsx";
import Root from "@time-tracker/shared/ui/main-layout/Root.tsx";
import {ManageUsersPermission} from "@time-tracker/shared/authorization/permissions.ts";
import {AuthProvider} from "@time-tracker/shared/authentication/AuthProvider.tsx";
import {NotFoundPage} from "@time-tracker/pages/404";
import {TimeTrackerPage} from "@time-tracker/pages/time-tracker";
import {UsersPage} from "@time-tracker/pages/users";
import {UserPage} from "@time-tracker/pages/user";
import {CreateUserPage} from "@time-tracker/pages/create-user";
import {CalendarPage} from "@time-tracker/pages/calendar";
import {WorkReportsPage} from "@time-tracker/pages/work-reports";
import {LoginPage} from "@time-tracker/pages/login";
import {AccountVerificationPage} from "@time-tracker/pages/account-verification";
import {ResetPasswordPage} from "@time-tracker/pages/reset-password";
import {TimeTrackerProvider} from "@time-tracker/pages/time-tracker/TimeTrackerProvider.tsx";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {PermissionsProvider} from "@time-tracker/shared/authorization/PermissionsProvider.tsx";
import {Unauthenticated} from "@time-tracker/shared/authentication/guards/Unauthenticated.tsx";

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
                            {path: "/workers-time", element: <WorkReportsPage/>},

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

const defaultTheme = createTheme();

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
                <AuthProvider>
                    <PermissionsProvider>
                        <SnackbarProvider>
                            <TimeTrackerProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <RouterProvider router={router}/>
                                </LocalizationProvider>
                            </TimeTrackerProvider>
                        </SnackbarProvider>
                    </PermissionsProvider>
                </AuthProvider>
            </ThemeProvider>
        </Provider>
    )
}
