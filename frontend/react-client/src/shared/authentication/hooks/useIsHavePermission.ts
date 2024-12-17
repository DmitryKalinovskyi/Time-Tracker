import useAuth from "./useAuth.ts";

export default function useIsHavePermission(permission: string){
    const auth = useAuth();

    if(auth.user === null) return false;

    return auth.user.permissions.includes(permission);
}