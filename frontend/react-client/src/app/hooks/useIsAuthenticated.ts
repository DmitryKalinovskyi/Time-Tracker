import useAuth from "./useAuth.ts";
import Token from "../types/Token.ts";

function isTokenExpired(token: Token) {
    let expiryDate = new Date(token.dateExpires);

    const tokenExpiryTime = Date.UTC(
        expiryDate.getUTCFullYear(),
        expiryDate.getUTCMonth(),
        expiryDate.getUTCDate(),
        expiryDate.getUTCHours(),
        expiryDate.getUTCMinutes(),
        expiryDate.getUTCSeconds()
    );

    return tokenExpiryTime < Date.now();
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