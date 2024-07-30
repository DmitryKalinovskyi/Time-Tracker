import {useContext} from "react";
import AuthContext from "../app/providers/AuthProvider.tsx";

export default function useAuth() {
    const authContext = useContext(AuthContext)

    if(!authContext)
        throw new Error("useAuth must be used with AuthProvider")

    return authContext;
}