import useAuth from "./useAuth.ts";
import useIsAuthenticated from "./useIsAuthenticated.ts";

export default function useIsHavePermission(permission: string){
    const isAuthenticated = useIsAuthenticated();
    const auth = useAuth();

    if(!isAuthenticated) return false;

    const permissions =  auth.user?.permissions ?? [];
    return permissions.filter(p => p === permission).length > 0;
}