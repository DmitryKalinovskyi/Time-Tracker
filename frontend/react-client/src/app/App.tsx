import HelloPage from "../pages/HelloPage.tsx";
import {Provider} from "react-redux";
import {store} from "../state/store.ts";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import ProtectedPage from "../pages/ProtectedPage.tsx";
import {AuthProvider} from "./providers/AuthProvider.tsx";
import RequirePermission from "./gates/RequirePermission.tsx";
import LoginPage from "../pages/LoginPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFoundPage/>,
        children: [
            {path: "/", element: <HelloPage/>},
            {path: "/hello", element: <HelloPage/>},
            {path: "/login", element: <LoginPage/>},
            {element: <RequirePermission permission={"MANAGE_USERS"}/>,
                children: [
                    {path: "/protected", element: <ProtectedPage/>}
                ]}
        ]
    }
])

export default function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </Provider>
    )
}
