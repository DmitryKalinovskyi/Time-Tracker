import useAuth from "./useAuth.ts";
import Token from "../types/Token.ts";

function isTokenExpired(token: Token) {
    return new Date(token.dateExpires) < Date.now()
}


export default function useIsAuthenticated(){
    const auth = useAuth();
    if(!auth.accessToken) return false;

    if(isTokenExpired(auth.accessToken)){
        // TODO: use refresh token to receive new access token.

        return false;
    }

    return true;
}