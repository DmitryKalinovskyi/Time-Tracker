import LoginPage from "./ui/pages/LoginPage.tsx";
import RegisterPage from "./ui/pages/RegisterPage.tsx";
import AccountVerificationPage from "./ui/pages/AccountVerificationPage.tsx";
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
            { path: "/register", element: <RegisterPage /> },
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
