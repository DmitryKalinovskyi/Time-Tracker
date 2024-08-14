import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/User.ts";
import Token from "../../types/Token.ts";
import {removeRefreshToken, saveRefreshToken} from "./refreshTokenManager.ts";

export interface AuthType {
    accessToken: Token | null,
    user: User | null
    loading: boolean,
    error: string | null
    refreshRejects: number,
    isRefreshed: boolean
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
    refreshRejects: 0,
    isRefreshed: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authUser : (state) => {
            state.loading = true;
        },
        refreshToken : (state, action: PayloadAction<{user: User, accessToken: Token, refreshToken: Token}>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isRefreshed = true;
            saveRefreshToken(action.payload.refreshToken);
        },
        refreshTokenReject: (state)=> {
            state.isRefreshed = true;
            state.refreshRejects++;
        },

        authUserSuccess: (state, action: PayloadAction<{user: User, accessToken: Token}>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
            state.refreshRejects = 0;
        },
        authUserFailure: (state, action: PayloadAction<any>) => {
            console.log(`Error while authentification user: ${action.payload} `);
            
            state.accessToken = null;
            state.user = null;
            state.error = action.payload.toString();
            state.loading = false;
        },

        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.error = null;
            state.loading = false;
            removeRefreshToken();
        }
    }
})

export const {authUser,
    refreshToken,
    refreshTokenReject,
    authUserSuccess,
    authUserFailure,
    logout} = authSlice.actions;

export default authSlice.reducer;