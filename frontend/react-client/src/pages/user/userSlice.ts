import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/User.ts";
import {ShowFailure, ShowSuccess} from "@time-tracker/shared/misc/SnackBarHelper.ts";
import {GraphQLExecutionErrorType} from "@time-tracker/shared/graphql/errors/GraphQLExecutionErrorType.ts";

export interface UserType {
    user: User,
    error: string | null
}
const initialState: UserType = {
    user: {} as User,
    error: null
};

export interface UpdateUserPayload {
    id: number,
    fullName: string,
    email: string,
    position: string,
    workHoursPerMonth: number
}

export interface UpdateUserActiveStatusPayload {
    id: number,
    isActive: boolean
}

export interface UpdateUserPermissionsPayload {
    id: number,
    permissions: string[]
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchUser: (state, action: PayloadAction<number>) => {
        },
        fetchUserSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        fetchUserFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },

        updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {

        },
        updateUserSuccess: (state, action: PayloadAction<number>) => {
            ShowSuccess("User successfully updated.");
        },
        updateUserFailure: (state, action: PayloadAction<GraphQLExecutionErrorType>) => {
            ShowFailure("Failed to update user: " + action.payload.message)
        },

        updateUserActiveStatus: (state, action: PayloadAction<UpdateUserActiveStatusPayload>) => {

        },
        updateUserActiveStatusSuccess: (state, action: PayloadAction<number>) => {
            ShowSuccess("User active status successfully updated.");
        },
        updateUserActiveStatusFailure: (state, action: PayloadAction<GraphQLExecutionErrorType>) => {
            ShowFailure("Failed to update user active status: " + action.payload.message)
        },

        updateUserPermissions: (state, action: PayloadAction<UpdateUserPermissionsPayload>) => {

        },
        updateUserPermissionsSuccess: (state, action: PayloadAction<number>) => {
            ShowSuccess("User permissions successfully updated.");
        },
        updateUserPermissionsFailure: (state, action: PayloadAction<GraphQLExecutionErrorType>) => {
            ShowFailure("Failed to update user permissions: " + action.payload.message)
        }
    }
})

export const {
    fetchUser,
    fetchUserSuccess,
    fetchUserFailure,

    updateUser,
    updateUserSuccess,
    updateUserFailure,

    updateUserActiveStatus,
    updateUserActiveStatusSuccess,
    updateUserActiveStatusFailure,

    updateUserPermissions,
    updateUserPermissionsSuccess,
    updateUserPermissionsFailure
 } = usersSlice.actions;

export default usersSlice.reducer;