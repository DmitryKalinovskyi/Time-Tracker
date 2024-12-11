import User from "../../../types/User.ts";
import useAuth from "./useAuth.ts";
import useIsAuthenticated from "./useIsAuthenticated.ts";

export function useIsMe(user: User | null){
    const auth = useAuth();
    const isAuthenticated = useIsAuthenticated();

    if(!isAuthenticated) return false;
    if(!user) return false;

    const me = auth.user;

    return me?.id == user.id;
}