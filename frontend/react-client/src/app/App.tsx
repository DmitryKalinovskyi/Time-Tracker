import LoginPage from "../app/ui/pages/LoginPage.tsx";
import AccountVerificationPage from "../app/ui/pages/AccountVerificationPage.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./ui/pages/NotFoundPage.tsx";
import HomePage from "./ui/pages/HomePage.tsx";
import RegisterUserPage from "./ui/pages/RegisterUserPage.tsx";
import RequireAuth from "./gates/RequireAuth.tsx";
import Root from "./ui/components/Root.tsx";
import UsersPage from "./ui/pages/UsersPage.tsx";
import UserPage from "./ui/pages/UserPage.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [{
      element: <Root />, children: [
        {
          element: <RequireAuth />, children: [
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
    ]
  }
])

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
