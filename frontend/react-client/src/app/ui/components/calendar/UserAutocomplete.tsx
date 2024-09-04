import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {Autocomplete, Avatar} from "@mui/material";
import {stringAvatar} from "../../../misc/StringHelper.ts";
import Typography from "@mui/material/Typography";
import React from "react";

export function UserAutocomplete(){
    return <Autocomplete renderInput={(params) => <TextField {...params} label="Enter user name or email" />}
                         options={["Dmytro Kalinovskyi", "Sasha Zaitsev", "Anto Ovod", "Nazar Gavriluik"]}
                         sx={{width:"300px"}}
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