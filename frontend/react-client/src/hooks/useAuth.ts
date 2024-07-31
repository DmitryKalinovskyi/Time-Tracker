import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";

export default function useAuth() {
    return useSelector((state: RootState) => state.auth);
}