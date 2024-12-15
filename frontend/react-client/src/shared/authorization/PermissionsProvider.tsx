import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchPermissions} from "@time-tracker/shared/authorization/permissionsSlice.ts";

export function PermissionsProvider({children}){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPermissions())
    }, []);

    return <>{children}</>
}