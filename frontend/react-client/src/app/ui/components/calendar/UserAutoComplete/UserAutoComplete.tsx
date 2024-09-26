import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Autocomplete, Avatar, CircularProgress} from "@mui/material";
import {stringAvatar} from "../../../../misc/StringHelper.ts";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import User from "../../../../types/User.ts";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {createRequest} from "../../../../misc/RequestCreator.ts";
import {usersByEmailOrFullNameQuery, UsersByEmailOrFullNameResponse} from "./api/userAutoCompleteQueries.ts";
import {catchError, map, of} from "rxjs";

interface UserAutoCompleteProps{
    selectedUser: User | null,
    onChange: (user: User | null) => void
}
export function UserAutoComplete(props: UserAutoCompleteProps){
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<User[] | null>(null);
    const loading = open && options === null;
    const [emailOrFullName, setEmailOrFullName] = useState<string>("");

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        const observable = ajax(createRequest(usersByEmailOrFullNameQuery(), {input: {usersLimit: 50, emailOrFullName}})).pipe(
            map((ajaxResponse: AjaxResponse<UsersByEmailOrFullNameResponse>) => {
                const errors = ajaxResponse.response.errors;
                if (errors) {
                    throw new Error(errors[0]);
                }
                return ajaxResponse.response.data.usersQuery.usersByEmailOrFullName;
            }),
            catchError((error) => {
                console.error("Request failed", error);
                return of([]); // return an empty array in case of error
            })
        );

        const subscription = observable.subscribe((users: User[]) => {
            if (active) {
                setOptions(users);
            }
        });

        return () => {
            active = false;
            subscription.unsubscribe();
        };
    }, [emailOrFullName, loading]);

    useEffect(() => {
        if(!open){
            setOptions(null);
        }
    }, [open]);


    return <Autocomplete renderInput={(params) => <TextField {...params} label="Enter user name or email" />}
                         options={options ?? []}
                         sx={{width:"100%"}}
                         open={open}
                         loading={loading}
                         value={props.selectedUser}
                         onOpen={() => setOpen(true)}
                         onClose={() => setOpen(false)}
                         onChange={(e, value) => {setEmailOrFullName(value?.fullName ?? ""); props.onChange(value)}}
                         onInputChange={(e, value) => {setOptions(null); setEmailOrFullName(value);}}
                         isOptionEqualToValue={(user: User, value) => {
                             return user.fullName === value.fullName && user.email == value.email;
                         }}
                         getOptionLabel={(user: User) => user.fullName}
                         filterOptions={(x) => x}

                         renderOption={(props, user: User) => {
                             const {key, ...optionProps} = props;

                             return  <Box
                                 key={user.email}
                                 component="li"
                                 {...optionProps}
                             >
                                 <Avatar {...stringAvatar(user.fullName)}/>
                                 <div>
                                     <div>
                                         <Typography sx={{ml: 2}}>
                                             {user.fullName}
                                         </Typography>
                                     </div>
                                     <div>
                                         <Typography sx={{ml: 2}} color="secondary">
                                             {user.email}
                                         </Typography>
                                     </div>
                                 </div>

                             </Box>
                         }}
    />
}