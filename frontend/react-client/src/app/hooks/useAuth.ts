import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {AuthType} from "../features/authentification/authSlice.ts";

export default function useAuth(): AuthType {
    return useSelector((state: RootState) => state.auth);
}