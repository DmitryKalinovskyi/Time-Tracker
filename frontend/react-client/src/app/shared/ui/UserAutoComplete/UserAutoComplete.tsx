import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Autocomplete, Avatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import {ajax, AjaxResponse} from "rxjs/ajax";
import {usersByEmailOrFullNameQuery, UsersByEmailOrFullNameResponse} from "./api/userAutoCompleteQueries.ts";
import {catchError, map, of} from "rxjs";
import User from "@time-tracker/types/User.ts";
import {createRequest} from "@time-tracker/shared/misc/RequestCreator.ts";
import {stringAvatar} from "@time-tracker/shared/misc/StringHelper.ts";

interface UserAutoCompleteProps{
    selectedUser: User | null,
    onChange: (user: User | null) => void
    usersLimit?: number,
}
export function UserAutoComplete(props: UserAutoCompleteProps){
    const [open, setOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<User[] | null>(null);
    const [emailOrFullName, setEmailOrFullName] = useState<string>("");

    const loading = open && users === null;

    useEffect(() => {
        if (!loading) {
            return;
        }

        const variables = {
            input: {
                usersLimit: props.usersLimit ?? 50,
                emailOrFullName
            }
        };

        const observable = ajax(createRequest(usersByEmailOrFullNameQuery(), variables)).pipe(
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
            setUsers(users);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [emailOrFullName, loading]);

    useEffect(() => {
        if(!open){
            setUsers(null);
        }
    }, [open]);


    return <Autocomplete renderInput={(params) => <TextField {...params} label="Enter user name or email" />}
                         options={users ?? []}
                         sx={{width:"100%"}}
                         open={open}
                         loading={loading}
                         value={props.selectedUser}
                         onOpen={() => setOpen(true)}
                         onClose={() => setOpen(false)}
                         onChange={(e, value) => {setEmailOrFullName(value?.fullName ?? ""); props.onChange(value)}}
                         onInputChange={(e, value) => {setUsers(null); setEmailOrFullName(value);}}
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