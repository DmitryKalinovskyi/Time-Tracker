import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../types/User.ts';

export interface CreateUserPayload {
    fullName: string;
    email: string;
    roleId?: number;
}

interface UserState {
    user: User | null;
    error: string | null;
    loading: boolean;
    verificationSuccess: boolean;
    createUserSuccess: boolean;
}

const initialState: UserState = {
    user: null,
    error: null,
    loading: false,
    verificationSuccess: false,
    createUserSuccess: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUserRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.createUserSuccess = false;
        },
        createUserSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            state.createUserSuccess = true;
        },
        createUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearCreateUserSuccess: (state) => {
            state.createUserSuccess = false;
        },
        verifyUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        verifyUserSuccess: (state) => {
            state.verificationSuccess = true;
            state.loading = false;
            state.error = null;
        },
        verifyUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    clearError,
    clearCreateUserSuccess,
    verifyUserRequest,
    verifyUserSuccess,
    verifyUserFailure
} = userSlice.actions;

export default userSlice.reducer;
