import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";

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
        fetchPermissions: () => {

        },
        fetchPermissionsSuccess: (state, action: PayloadAction<string[]>) => {
            state.permissions = action.payload
        },
        fetchPermissionsFailure: (state, action: PayloadAction<GraphQLExecutionErrorType>) => {
            state.error = action.payload.message
        },
    }
})

export const {
    fetchPermissions,
    fetchPermissionsSuccess,
    fetchPermissionsFailure
 } = permissionsSlice.actions;

export default permissionsSlice.reducer;