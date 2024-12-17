import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ResetPasswordState {
    error: string | null;
    loading: boolean;
    success: boolean | null;
}

const initialState: ResetPasswordState = {
    error: null,
    loading: false,
    success: false
}

export interface ResetPasswordPayload {
    email: string
}

const resetPasswordSlice = createSlice({
    name: 'reset',
    initialState,
    reducers: {
        resetPassword: (state, _action: PayloadAction<ResetPasswordPayload>) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        resetPasswordSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        resetPasswordFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        }
    }
});

export  const {
    resetPassword,
    resetPasswordSuccess,
    resetPasswordFailure
} = resetPasswordSlice.actions;

export  default resetPasswordSlice.reducer;