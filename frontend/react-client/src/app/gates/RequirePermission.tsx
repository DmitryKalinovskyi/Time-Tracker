import useIsHavePermission from "../hooks/useIsHavePermission.ts";
import {Outlet} from "react-router-dom";
import UnauthorizedPage from "../ui/pages/UnauthorizedPage.tsx";

export default function RequirePermission({permission}: {permission: string}){
    const isHavePermission = useIsHavePermission(permission);
    return isHavePermission? <Outlet/> : <UnauthorizedPage/>
}