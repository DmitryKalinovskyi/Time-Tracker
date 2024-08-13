import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/User.ts";
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
    accessToken: null,
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
            state.loading = true;
        },

        authUserSuccess: (state, action: PayloadAction<AuthType>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.success = action.payload.success;
            state.loading = false;
            state.error = null;
        },

        authUserFailure: (state, action: PayloadAction<any>) => {
            console.log(`Error while authentification user: ${action.payload} `);
            
            state.accessToken = null;
            state.user = null;
            state.error = action.payload.toString();
            state.success = false;
            state.loading = false;
        },

        logout: (state, action: PayloadAction) => {
            state.accessToken = null;
            state.user = null;
            state.error = null;
            state.success = false;
            state.loading = false;
        }
    }
})

export const {authUser,
    authUserSuccess,
    authUserFailure,
    logout} = authSlice.actions;

export default authSlice.reducer;