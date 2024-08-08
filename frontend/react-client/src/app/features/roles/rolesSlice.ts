import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Role from "../../types/Role.ts";

const initialState = {
    roles: [],
    permissions: ["MANAGE_USERS", "MANAGE_ROLES"],
    errors: []
};

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        getRoles: (state, action: PayloadAction) => {},
        addRole: (state, action: PayloadAction<Role>) => {},
        updateRole: (state, action: PayloadAction<Role>) => {},
        removeRole: (state, action: PayloadAction<Role>) => {},

        getRolesSuccess: (state, action: PayloadAction<Role[]>) => {
            state.roles = action.payload;
        },
        addRoleSuccess: (state, action: PayloadAction<Role>) => {
            state.roles.push(action.payload);
        },
        roleFailure: (state, action: PayloadAction<string>) =>
        {
            state.errors.push(action.payload);
        },
        updateRoleSuccess: (state, action: PayloadAction<Role>) => {
            state.roles = state.roles.map(r => r.id == action.payload.id ? action.payload : r);
        },
        removeRoleSuccess: (state, action: PayloadAction<number>) => {
            state.roles = state.roles.filter(r => r.id != action.payload);
        }
    }
})

export const {
    getRoles,
    getRolesSuccess,
    addRole,
    updateRole,
    removeRole,
    addRoleSuccess,
    updateRoleSuccess,
    removeRoleSuccess,
    roleFailure} = rolesSlice.actions;

export default rolesSlice.reducer;