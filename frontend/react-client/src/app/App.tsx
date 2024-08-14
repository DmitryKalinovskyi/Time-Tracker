import LoginPage from "../app/ui/pages/LoginPage.tsx";
import AccountVerificationPage from "../app/ui/pages/AccountVerificationPage.tsx";
import {Provider, useDispatch} from "react-redux";
import { store } from "./store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./ui/pages/NotFoundPage.tsx";
import HomePage from "./ui/pages/HomePage.tsx";
import RegisterUserPage from "./ui/pages/RegisterUserPage.tsx";
import ResetUserPasswordPage from "./ui/pages/ResetPasswordPage.tsx";
import RequireAuth from "./gates/RequireAuth.tsx";
import Root from "./ui/components/Root.tsx";
import {AuthProvider} from "./features/authentification/AuthProvider.tsx";

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
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  )
}
