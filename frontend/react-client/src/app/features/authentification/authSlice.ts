import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import User from "../../types/User.ts";
import Token from "../../types/Token.ts";
import {removeRefreshToken, saveRefreshToken} from "./refreshTokenManager.ts";

export interface AuthType {
    accessToken: Token | null,
    user: User | null
    loading: boolean,
    error: string | null
    isRefreshing: boolean,
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
    isRefreshing: false,
    isRefreshed: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser : (state) => {
            state.loading = true;
        },
        beginRefreshToken: (state) => {
            state.isRefreshing = true;
        },
        refreshToken : (state, action: PayloadAction<{user: User, accessToken: Token, refreshToken: Token}>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isRefreshing = false;
            state.isRefreshed = true;
            saveRefreshToken(action.payload.refreshToken);
        },
        refreshTokenReject: (state)=> {
            state.isRefreshing = false;
            state.isRefreshed = true;
            removeRefreshToken();
        },
        loginSuccess: (state, action: PayloadAction<{user: User, accessToken: Token}>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
            state.refreshRejects = 0;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.accessToken = null;
            state.user = null;
            state.error = action.payload;
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

export const {loginUser,
    beginRefreshToken,
    refreshToken,
    refreshTokenReject,
    loginSuccess,
    loginFailure,
    logout} = authSlice.actions;

export default authSlice.reducer;