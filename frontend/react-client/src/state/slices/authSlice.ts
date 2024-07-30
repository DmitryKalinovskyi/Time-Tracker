import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthType} from "../../app/providers/AuthProvider.tsx";
import useAuth from "../../hooks/useAuth.ts";

const initialState = {
    msg: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        set_auth: (state, action: PayloadAction<AuthType>) => {
        }
    }
})

export const {set_hello_message} = authSlice.actions;

export default authSlice.reducer;