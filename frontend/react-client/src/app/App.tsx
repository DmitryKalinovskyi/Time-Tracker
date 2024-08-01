import LoginPage from "../pages/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import AccountVerificationPage from "../pages/AccountVerificationPage.tsx";
import HelloPage from "../pages/HelloPage.tsx";
import {Provider} from "react-redux";
import {store} from "../state/store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFoundPage/>,
        children: [
            {path: "/", element: <HelloPage/>},
            {path: "/hello", element: <HelloPage/>},
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
