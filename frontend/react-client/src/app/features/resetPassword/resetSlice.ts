import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ResetType {
    error: string | null;
    loading: boolean;
    success: boolean | null;
}

const initialState: ResetType = {
    error: null,
    loading: false,
    success: false
}

export interface ResetPlayload {
    email: string
}

const resetSlice = createSlice({
    name: 'reset',
    initialState,
    reducers: {
        resetUserPasswordRequest: (state, _action: PayloadAction<ResetPlayload>) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        resetUserPasswordSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        resetUserPasswordFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        }
    }
});

export  const { resetUserPasswordRequest, resetUserPasswordSuccess, resetUserPasswordFailure} = resetSlice.actions;

export  default resetSlice.reducer;