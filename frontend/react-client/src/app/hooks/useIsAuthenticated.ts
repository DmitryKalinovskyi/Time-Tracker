import useAuth from "./useAuth.ts";
import {isTokenExpired} from "../misc/tokenValidation.ts";


export default function useIsAuthenticated(){
    const auth = useAuth();
    if(!auth.accessToken) return false;

    if(isTokenExpired(auth.accessToken)){
        return false;
    }

    return true;
}