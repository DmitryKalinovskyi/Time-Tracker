import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/material";
import React, {ReactElement, useState} from "react";
import User from "../../../../types/User.ts";
import {UserAutoCompleteOption} from "./UserAutoCompleteOption.tsx";
import {useUsers} from "@time-tracker/shared/ui/UserAutoComplete/hooks/useUsers.ts";

interface UserAutoCompleteProps {
    selectedUser: User | null,
    onChange: (user: User | null) => void
    usersLimit?: number,
    renderInput?: (params) => ReactElement
    disableClearable?: false,
    hideLoading?: false
}

export function UserAutoComplete (props: UserAutoCompleteProps){
    const [open, setOpen] = useState<boolean>(false);
    const [emailOrFullName, setEmailOrFullName] = useState<string>("");

    const {users, loading} = useUsers(emailOrFullName, props.usersLimit);

    const handleUserChange = (e, value) => {
        setEmailOrFullName(value?.fullName ?? "");
        props.onChange(value)
    }

    const handleInputChange = (e, value) => {
        setEmailOrFullName(value);
    }

    const isOptionEqualToValue = (user: User, value: User) => {
        return user.id === value.id;
    };

    // we need to disable client side filtering.
    const doesNotFilter = (x: User[]) => x;

    const getDefaultInput = (params) => {
        return <TextField {...params} label="Enter user name or email"/>;
    }

    const handleRenderInput = (params) => {
        if (props.renderInput) return props.renderInput(params);
        return getDefaultInput(params);
    }

    return <Autocomplete renderInput={handleRenderInput}
                         options={loading && !props.hideLoading ? []: users}
                         sx={{width: "100%"}}
                         open={open}
                         loading={loading}
                         value={props.selectedUser}
                         onOpen={() => setOpen(true)}
                         onClose={() => setOpen(false)}
                         disableClearable={props.disableClearable}
                         onChange={handleUserChange}
                         onInputChange={handleInputChange}
                         isOptionEqualToValue={isOptionEqualToValue}
                         getOptionLabel={(user: User) => user.fullName}
                         filterOptions={doesNotFilter}
                         renderOption={(props, user: User) =>
                             <UserAutoCompleteOption key={user.id} props={props} user={user}/>}
    />
}