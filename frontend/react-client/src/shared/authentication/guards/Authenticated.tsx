import useIsAuthenticated from "../hooks/useIsAuthenticated.ts";
import {Navigate, Outlet} from "react-router-dom";

export default function Authenticated(){
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
}