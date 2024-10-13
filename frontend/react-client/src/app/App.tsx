import { SnackbarProvider } from 'notistack';
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequireAuth from "@time-tracker/features/authentification/guards/RequireAuth.tsx";
import { store } from "./store.ts";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import RequirePermission from "@time-tracker/features/authentification/guards/RequirePermission.tsx";
import Root from "@time-tracker/shared/ui/main-layout/Root.tsx";
import {ManageUsersPermission} from "@time-tracker/features/permissions/permissions.ts";
import {AuthProvider} from "@time-tracker/features/authentification/AuthProvider.tsx";
import {TimeTrackerProvider} from "@time-tracker/features/timeTracking/TimeTrackerProvider.tsx";
import {NotFoundPage} from "@time-tracker/pages/404";
import {TimeTrackerPage} from "@time-tracker/pages/time-tracker";
import {UsersPage} from "@time-tracker/pages/users";
import {UserPage} from "@time-tracker/pages/user";
import {CreateUserPage} from "@time-tracker/pages/create-user";
import {CalendarPage} from "@time-tracker/pages/calendar";
import {ReportsPage} from "@time-tracker/pages/reports";
import {LoginPage} from "@time-tracker/pages/login";
import {AccountVerificationPage} from "@time-tracker/pages/account-verification";
import {ResetPasswordPage} from "@time-tracker/pages/reset-password";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [{
      element: <RequireAuth />, children: [
        {
          element: <Root />, children: [
            { path: "/", element: <TimeTrackerPage /> },
            { path: "/home", element: <TimeTrackerPage /> },
            { path: "/users", element: <UsersPage /> },
            { path: "/user/:UserId", element: <UserPage /> },
            { element: <RequirePermission permission={ManageUsersPermission}/>, children: [
              { path: "/register", element: <CreateUserPage/> },
              ]},
            { path: "/calendar", element: <CalendarPage/> },
            { path: "/workers-time", element: <ReportsPage /> },

          ]
        }
      ]
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/verification", element: <AccountVerificationPage /> },
      { path: "/reset", element: <ResetPasswordPage /> },
    ]
  }
])

export default function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <SnackbarProvider>
                    <TimeTrackerProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <RouterProvider router={router}/>
                        </LocalizationProvider>
                    </TimeTrackerProvider>
                </SnackbarProvider>
            </AuthProvider>
        </Provider>
    )
}
