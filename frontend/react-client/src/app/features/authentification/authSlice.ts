import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/User.ts";
import { AUTH_KEY_NAME } from "../../config.ts";

export interface AuthType {
    accessToken: string | null,
    user: User | null
    loading: boolean,
    error: string | null
}

export interface AuthPayload {
    email: string, 
    password: string
}

const initialState: AuthType = 
{
    accessToken: JSON.parse(localStorage[AUTH_KEY_NAME] ?? "{}"),
    user: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "AUTH",
    initialState,
    reducers: {
        authUser : (state, _action: PayloadAction<AuthPayload>) => {
            state.loading = true;
            state.error = null;
        },

        authUserSuccess: (state, action: PayloadAction<AuthType>) => {

            console.log(action.payload)
            console.log("Authenticated.")

            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;

            localStorage.setItem(AUTH_KEY_NAME, JSON.stringify({
                accessToken: action.payload.accessToken,
                user: action.payload.user}
            ));
        },

        authUserFailure: (state, action: PayloadAction<string>) => {
            console.log(`Error while authentification user: ${action.payload} `);

            state.accessToken = null;
            state.user = null;

            localStorage.removeItem(AUTH_KEY_NAME);
        }
    }
})

export const {authUser, authUserSuccess, authUserFailure} = authSlice.actions;

export default authSlice.reducer;