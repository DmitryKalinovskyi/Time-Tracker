import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/User.ts";

export interface UsersPage{
    totalCount: number,
        pageInfo: {
          hasNextPage: boolean,
          hasPreviousPage: boolean,
          startCursor: string,
          endCursor: string
        },
        edges: 
          {
            cursor: string,
            node: User
          }[],
}

export interface UsersType {
    usersPage: UsersPage,
    error: string | null
}
const initialState: UsersType = {
    usersPage: {} as UsersPage,
    error: null
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchUsersSuccess: (state, action: PayloadAction<UsersPage>) => {
            state.usersPage = action.payload
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
    }
})

export const { 
    fetchUsersSuccess,
    fetchUsersFailure
 } = usersSlice.actions;

export default usersSlice.reducer;