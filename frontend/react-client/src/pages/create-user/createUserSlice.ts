import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User  from '../../types/User.ts';

export interface CreateUserState {
    user: User | null;
    error: string | null;
    loading: boolean;
    success: boolean | null;
}

const initialState: CreateUserState = {
    user: null,
    error: null,
    loading: false,
    success: null
};

export interface CreateUserPayload {
    fullName: string, 
    email: string,
    position: string,
    workHoursPerMonth: number
}

const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {
        createUser: (state, _action: PayloadAction<CreateUserPayload>) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        createUserSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            console.log("Created.")
            state.success = true;
        },
        createUserFailure: (state, action: PayloadAction<string>) => {
            state.user = null;
            state.error = action.payload;
            state.loading = false;
            state.success = false;
        },
    }
});

export const {
    createUser,
    createUserSuccess,
    createUserFailure
} = createUserSlice.actions;

export default createUserSlice.reducer;
