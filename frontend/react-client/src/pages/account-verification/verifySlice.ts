import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VerifyState {
    error: string | null;
    loading: boolean;
    success: boolean | null;
}

const initialState: VerifyState = {
    error: null,
    loading: false,
    success: null
};

export interface VerifyPayload {
    code: string, 
    password: string
}

const verifySlice = createSlice({
    name: 'verify',
    initialState,
    reducers: {
        verifyUser: (state, _action: PayloadAction<VerifyPayload>) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        verifyUserSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        verifyUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        },
    }
});

export const {
    verifyUser,
    verifyUserSuccess,
    verifyUserFailure
} = verifySlice.actions;

export default verifySlice.reducer;
