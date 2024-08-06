import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/User.ts";
import { AUTH_KEY_NAME } from "../../config.ts";
import Token from "../../types/Token.ts";

export interface AuthType {
    accessToken: Token | null,
    user: User | null
    loading: boolean,
    error: string | null
    success: boolean | null
}

export interface AuthPayload {
    email: string, 
    password: string
}

const initialState: AuthType =
{
    accessToken: JSON.parse(localStorage[AUTH_KEY_NAME]) ?? null,
    user: null,
    loading: false,
    error: null,
    success: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authUser : (state, _action: PayloadAction<AuthPayload>) => {
            state.accessToken = null;
            state.user = null;
            state.loading = true;
            state.error = null;
            state.success = null;
        },

        authUserSuccess: (state, action: PayloadAction<AuthType>) => {

            console.log(action.payload)
            console.log("Authenticated.")

            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.success = action.payload.success;
            state.loading = false;
            state.error = null;

            localStorage.setItem(AUTH_KEY_NAME, JSON.stringify(
                action.payload.accessToken
            ));
        },

        authUserFailure: (state, action: PayloadAction<any>) => {
            console.log(`Error while authentification user: ${action.payload} `);
            
            state.accessToken = null;
            state.user = null;
            state.error = action.payload.toString();
            state.success = false;
            state.loading = false;
            
            localStorage.removeItem(AUTH_KEY_NAME);
        }
    }
})

export const {authUser, authUserSuccess, authUserFailure} = authSlice.actions;

export default authSlice.reducer;