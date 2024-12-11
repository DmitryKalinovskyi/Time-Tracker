import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VerifType {
    error: string | null;
    loading: boolean;
    success: boolean | null;
}

const initialState: VerifType = {
    error: null,
    loading: false,
    success: null
};

export interface VerifPayload {
    code: string, 
    password: string
}

const verifSlice = createSlice({
    name: 'verif',
    initialState,
    reducers: {
        verifUserRequest: (state, _action: PayloadAction<VerifPayload>) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        verifUserSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        verifUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        },
    }
});

export const { verifUserRequest, verifUserSuccess, verifUserFailure } = verifSlice.actions;

export default verifSlice.reducer;
