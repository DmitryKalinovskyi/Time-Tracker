import useIsHavePermission from "../../hooks/useIsHavePermission.ts";
import {Outlet} from "react-router-dom";
import UnauthorizedPage from "../../pages/UnauthorizedPage.tsx";

export default function RequirePermission({permission}){
    const isHavePermission = useIsHavePermission(permission);
    return isHavePermission? <Outlet/> : <UnauthorizedPage/>
}