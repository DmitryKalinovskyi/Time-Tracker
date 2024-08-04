import LoginPage from "../app/ui/pages/LoginPage.tsx";
import CreateUserPage from "../app/ui/pages/CreateUserPage.tsx";
import AccountVerificationPage from "../app/ui/pages/AccountVerificationPage.tsx";
import {Provider} from "react-redux";
import {store} from "./store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFoundPage from "./ui/pages/NotFoundPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFoundPage/>,
        children: [
            { path: "/", element: <LoginPage /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/create", element: <CreateUserPage /> },
            { path: "/verification", element: <AccountVerificationPage /> },
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
