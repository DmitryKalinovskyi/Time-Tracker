import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Role from "../../types/Role.ts";

const initialState = {
    roles: [],
    permissions: ["Manage Users", "Manage Roles"]
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        addRole: (state, action: PayloadAction<Role>) => {
            state.roles.push(action.payload);
        },
        updateRole: (state, action: PayloadAction<Role>) => {
            state.roles = state.roles.map(r => r.id == action.payload.id ? action.payload : r);
        },
        removeRole: (state, action: PayloadAction<number>) => {
            state.roles = state.roles.filter(r => r.id != action.payload);
        }
    }
})

export const {addRole, updateRole, removeRole} = rolesSlice.actions;

export default rolesSlice.reducer;