import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User  from '../../types/User';

export interface RegisterType {
    user: User | null;
    error: string | null;
    loading: boolean;
    success: boolean | null;
}

const initialState: RegisterType = {
    user: null,
    error: null,
    loading: false,
    success: null
};

export interface RegisterPayload {
    fullName: string, 
    email: string,
    position: string,
    workHoursPerMonth: number
}

const registerSlice = createSlice({
    name: 'reg',
    initialState,
    reducers: {
        registerUserRequest: (state, _action: PayloadAction<RegisterPayload>) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        registerUserSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        registerUserFailure: (state, action: PayloadAction<string>) => {
            state.user = null;
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        },
    }
});

export const { registerUserRequest, registerUserSuccess, registerUserFailure } = registerSlice.actions;

export default registerSlice.reducer;
