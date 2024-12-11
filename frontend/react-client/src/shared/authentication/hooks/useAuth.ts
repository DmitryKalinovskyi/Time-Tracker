import {useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {AuthType} from "@time-tracker/shared/authentication/authSlice.ts";

export default function useAuth(): AuthType {
    return useSelector((state: RootState) => state.auth);
}