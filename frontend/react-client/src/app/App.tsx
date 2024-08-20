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
import { TimerProvider } from './features/timeTracking/TimerProvider.tsx';

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
            { path: "/register", element: <RegisterUserPage /> },
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
                <TimerProvider>
                  <RouterProvider router={router} />
                </TimerProvider>
              </SnackbarProvider>
      </AuthProvider>
    </Provider>
  )
}
