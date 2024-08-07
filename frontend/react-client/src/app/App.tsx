import LoginPage from "../app/ui/pages/LoginPage.tsx";
import AccountVerificationPage from "../app/ui/pages/AccountVerificationPage.tsx";
import {Provider} from "react-redux";
import {store} from "./store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFoundPage from "./ui/pages/NotFoundPage.tsx";
import HomePage from "./ui/pages/HomePage.tsx";
import RoleManagementPage from "./ui/pages/RoleManagementPage.tsx";
import RegisterUserPage from "./ui/pages/RegisterUserPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFoundPage/>,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/home", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterUserPage /> },
            { path: "/verification", element: <AccountVerificationPage /> },
            { path: "/role/manage", element: <RoleManagementPage /> },
        ]
    }
])

export default function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}
