import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Autocomplete, Avatar} from "@mui/material";
import {stringAvatar} from "../../../misc/StringHelper.ts";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import User from "../../../types/User.ts";

interface UserAutocompleteProps{
    selectedUser: User,
    onChange: (user: User) => void
}
function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}
export function UserAutocomplete(){
    const [open, setOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<string[] | null>(null);
    const loading = open && options === null;
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3);

            if (active) {
                setOptions(["Dmytro Kalinovskyi", "Sasha Zaitsev", "Anto Ovod", "Nazar Gavriluik"]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if(!open){
            setOptions(null);
        }
    }, [open]);

    return <Autocomplete renderInput={(params) => <TextField {...params} label="Enter user name or email" />}
                         options={options ?? []}
                         sx={{width:"300px"}}
                         open={open}
                         loading={loading}
                         onOpen={() => setOpen(true)}
                         onClose={() => setOpen(false)}
                         // filterOptions={(x) => x} disable built-in filtering
                         renderOption={(props, option: string) => {
                             const {key, ...optionProps} = props;

                             return  <Box
                                 key={key}
                                 component="li"
                                 {...optionProps}
                             >
                                 <Avatar {...stringAvatar(option)}/>
                                 <Typography sx={{ml: 2}}>
                                     {option}
                                 </Typography>
                             </Box>
                         }}
    />
}