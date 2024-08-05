import {useSelector} from "react-redux";
import {RootState} from "../store.ts";
import {AuthType} from "../features/authentification/authSlice.ts";

export default function useAuth() {
    return useSelector<AuthType>((state: RootState) => state.auth);
}