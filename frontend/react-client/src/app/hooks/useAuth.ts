import {useSelector} from "react-redux";
import {RootState} from "../store.ts";

export default function useAuth() {
    return useSelector((state: RootState) => state.auth);
}