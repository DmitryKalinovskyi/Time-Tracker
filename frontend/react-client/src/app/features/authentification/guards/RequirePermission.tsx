import useIsHavePermission from "../hooks/useIsHavePermission.ts";
import {Outlet} from "react-router-dom";
import {UnauthorizedPage} from "@time-tracker/pages/401";

export default function RequirePermission({permission}: {permission: string}){
    const isHavePermission = useIsHavePermission(permission);
    return isHavePermission? <Outlet/> : <UnauthorizedPage/>
}