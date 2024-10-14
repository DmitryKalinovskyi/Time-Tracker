import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/material";
import React, {ReactElement, useEffect, useState} from "react";
import User from "@time-tracker/types/User.ts";
import {getUsersObservable} from "@time-tracker/shared/ui/UserAutoComplete/api/getUsersObservable.ts";
import {UserAutoCompleteOption} from "./UserAutoCompleteOption.tsx";

interface UserAutoCompleteProps {
    selectedUser: User | null,
    onChange: (user: User | null) => void
    usersLimit?: number,
    renderInput?: (params) => ReactElement
}

export function UserAutoComplete(props: UserAutoCompleteProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<User[] | null>(null);
    const [emailOrFullName, setEmailOrFullName] = useState<string>("");

    const loading = open && users === null;

    useEffect(() => {
        if (!loading)
            return;

        const usersObservable = getUsersObservable(emailOrFullName, props.usersLimit ?? 50, 200);
        const subscription = usersObservable.subscribe({
            next: (users: User[]) => setUsers(users),
            error: () => setUsers([])
        })

        return () => {
            subscription.unsubscribe();
        };
    }, [props.usersLimit, emailOrFullName, loading]);

    const handleUserChange = (e, value) => {
        setEmailOrFullName(value?.fullName ?? "");
        props.onChange(value)
    }

    const handleInputChange = (e, value) => {
        setUsers(null);
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
                         options={users ?? []}
                         sx={{width: "100%"}}
                         open={open}
                         loading={loading}
                         value={props.selectedUser}
                         onOpen={() => setOpen(true)}
                         onClose={() => setOpen(false)}
                         onChange={handleUserChange}
                         onInputChange={handleInputChange}
                         isOptionEqualToValue={isOptionEqualToValue}
                         getOptionLabel={(user: User) => user.fullName}
                         filterOptions={doesNotFilter}
                         renderOption={(props, user: User) =>
                             <UserAutoCompleteOption props={props} user={user}/>}
    />
}