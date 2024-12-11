import useAuth from "./useAuth.ts";


export default function useIsAuthenticated(){
    const auth = useAuth();

    return auth.accessToken != null;
}