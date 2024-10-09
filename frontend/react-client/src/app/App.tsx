import { SnackbarProvider } from 'notistack';
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountVerificationPage from "../app/ui/pages/AccountVerificationPage.tsx";
import LoginPage from "../app/ui/pages/LoginPage.tsx";
import RequireAuth from "./gates/RequireAuth.tsx";
import { store } from "./store.ts";
import Root from "./ui/components/mainLayout/Root.tsx";
import HomePage from "./ui/pages/HomePage.tsx";
import NotFoundPage from "./ui/pages/NotFoundPage.tsx";
import RegisterUserPage from "./ui/pages/RegisterUserPage.tsx";
import ResetUserPasswordPage from "./ui/pages/ResetPasswordPage.tsx";
import {AuthProvider} from "./features/authentification/AuthProvider.tsx";
import UserPage from "./ui/pages/UserPage.tsx";
import UsersPage from "./ui/pages/UsersPage.tsx";
import {CalendarPage} from "./ui/pages/CalendarPage.tsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import RequirePermission from "./gates/RequirePermission.tsx";
import {ManageUsersPermission} from "./features/permissions/permissions.ts";
import {ReportsPage} from "./ui/pages/ReportsPage.tsx";
import {TimeTrackerProvider} from "./features/timeTracking/TimeTrackerProvider.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [{
      element: <RequireAuth />, children: [
        {
          element: <Root />, children: [
            { path: "/", element: <HomePage /> },
            { path: "/home", element: <HomePage /> },
            { path: "/users", element: <UsersPage /> },
            { path: "/user/:UserId", element: <UserPage /> },
            { element: <RequirePermission permission={ManageUsersPermission}/>, children: [
              { path: "/register", element: <RegisterUserPage /> },
              ]},
            { path: "/calendar", element: <CalendarPage/> },
            { path: "/workers-time", element: <ReportsPage /> },

          ]
        }
      ]
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/verification", element: <AccountVerificationPage /> },
      { path: "/reset", element: <ResetUserPasswordPage /> },
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
