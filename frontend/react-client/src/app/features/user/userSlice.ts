import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/User.ts";

export interface UserType {
    user: User,
    error: string | null
}
const initialState: UserType = {
    user: {} as User,
    error: null
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchUserSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        fetchUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    }
})

export const { 
    fetchUserSuccess,
    fetchUserFailure
 } = usersSlice.actions;

export default usersSlice.reducer;