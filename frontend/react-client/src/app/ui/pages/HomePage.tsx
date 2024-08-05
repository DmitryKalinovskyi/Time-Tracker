import useIsAuthenticated from "../../hooks/useIsAuthenticated.ts";
import {Navigate} from "react-router-dom";

export default function HomePage(){
    const isAuthenticated = useIsAuthenticated();

    if(!isAuthenticated) return <Navigate to={"/login"}/>

    return <div>Home page!</div>;
}