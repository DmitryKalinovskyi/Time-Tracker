import {useSelector} from "react-redux";
import {AuthType} from "@time-tracker/shared/authentication/authSlice.ts";
import {RootState} from "@time-tracker/app/store.ts";

export default function useAuth(): AuthType {
    return useSelector((state: RootState) => state.auth);
}