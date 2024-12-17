import useIsAuthenticated from "@time-tracker/shared/authentication/hooks/useIsAuthenticated.ts";
import {Navigate, Outlet} from "react-router-dom";

export function Unauthenticated({to}){
    const isAuthenticated = useIsAuthenticated();

    if(isAuthenticated) return <Navigate to={to}/>
    return <Outlet/>
}