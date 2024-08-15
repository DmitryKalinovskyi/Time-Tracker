import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
    permissions: string[],
    error: string | null
}
const initialState: UserType = {
    permissions: [],
    error: null
};

const permissionsSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchPermissionsSuccess: (state, action: PayloadAction<string[]>) => {
            state.permissions = action.payload
        },
        fetchPermissionsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    }
})

export const { 
    fetchPermissionsSuccess,
    fetchPermissionsFailure
 } = permissionsSlice.actions;

export default permissionsSlice.reducer;