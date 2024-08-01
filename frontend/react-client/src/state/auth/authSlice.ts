import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../models/User.ts";

type AuthType = {
    accessToken?: string,
    user?: User
}

const key = "__AUTH"
const initialState: AuthType = JSON.parse(localStorage[key] ?? "{}");

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        set_auth: (state, action: PayloadAction<AuthType>) => {
            console.log(action.payload)
            console.log("Authenticated.")
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;

            localStorage.setItem(key, JSON.stringify({
                accessToken: action.payload.accessToken,
                user: action.payload.user}
            ));
        }
    }
})

export const {set_auth} = authSlice.actions;

export default authSlice.reducer;