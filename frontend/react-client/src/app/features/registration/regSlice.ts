import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User  from '../../types/User';

export interface RegType {
    user: User | null;
    error: string | null;
    loading: boolean;
    success: boolean | null;
}

const initialState: RegType = {
    user: null,
    error: null,
    loading: false,
    success: null
};

export interface RegPayload {
    fullName: string, 
    email: string
}

const regSlice = createSlice({
    name: 'reg',
    initialState,
    reducers: {
        regUserRequest: (state, _action: PayloadAction<RegPayload>) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        regUserSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        regUserFailure: (state, action: PayloadAction<string>) => {
            state.user = null;
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        },
    }
});

export const { regUserRequest, regUserSuccess, regUserFailure } = regSlice.actions;

export default regSlice.reducer;
