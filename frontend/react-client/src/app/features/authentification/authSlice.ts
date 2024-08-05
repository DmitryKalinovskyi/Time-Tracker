import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/User.ts";
import { AUTH_KEY_NAME } from "../../config.ts";
import Token from "../../types/Token.ts";

export interface AuthType {
    accessToken: Token | null,
    user: User | null
    loading: boolean,
    error: string | null
}

export interface AuthPayload {
    email: string, 
    password: string
}

const initialState: AuthType = JSON.parse(localStorage[AUTH_KEY_NAME] ?? "null") ??
{
    accessToken: null,
    user: null,
    loading: false,
    error: null
};

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
                user: action.payload.user,
                loading: false,
                error: null
            }
            ));
        },

        authUserFailure: (state, action: PayloadAction<any>) => {
            console.log(`Error while authentification user: ${action.payload} `);
            state.accessToken = null;
            state.user = null;
            state.error = action.payload.toString();

            localStorage.removeItem(AUTH_KEY_NAME);
        }
    }
})

export const {authUser, authUserSuccess, authUserFailure} = authSlice.actions;

export default authSlice.reducer;