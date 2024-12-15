import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/User.ts";
import {GetUsersQueryResponseType} from "./api/usersQueries.ts";

export interface UsersPage {
    results: User[],
    totalRecords: number
    totalPages: number
    currentPage: number
    pageSize: number
}

export interface UsersSliceStateType{
    usersPage: UsersPage,
    error: null | string
}

const initialState: UsersSliceStateType= {
    usersPage: {
        results: [],
        totalRecords: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 0,
    },
    error: null
};

export interface FetchUsersPayload {
    pageNumber: number,
    pageSize: number,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchUsers: (state, action: PayloadAction<FetchUsersPayload>) => {

        },
        fetchUsersSuccess: (state, action: PayloadAction<GetUsersQueryResponseType>) => {
            state.usersPage = action.payload.data.usersQuery.users
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    }
})

export const {
    fetchUsers,
    fetchUsersSuccess,
    fetchUsersFailure
 } = usersSlice.actions;

export default usersSlice.reducer;