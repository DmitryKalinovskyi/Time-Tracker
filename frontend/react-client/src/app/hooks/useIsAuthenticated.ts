import useAuth from "./useAuth.ts";
import {jwtDecode} from "jwt-decode";

function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp < currentTime;
    } catch (e) {
        return true; // Treat as expired if decoding fails
    }
}


export default function useIsAuthenticated(){
    const auth = useAuth();

    if(!auth.accessToken) return false;

    // if(isTokenExpired(auth.accessToken)){
    //     // TODO: use refresh token to receive new access token.
    //
    //     return false;
    // }

    return true;
}