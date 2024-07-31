import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type AuthType = {
    accessToken?: string,
    userId?: number,
    permissions?: string[]
}

const initialState: AuthType = {};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        set_auth: (state, action: PayloadAction<AuthType>) => {
            state.accessToken = action.payload.accessToken;
            state.userId = action.payload.userId;
            state.permissions = action.payload.permissions;
        }
    }
})

export const {set_auth} = authSlice.actions;

export default authSlice.reducer;