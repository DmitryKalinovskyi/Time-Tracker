import Box from "@mui/material/Box";
import {Avatar} from "@mui/material";
import {stringAvatar} from "@time-tracker/shared/misc/StringHelper.ts";
import Typography from "@mui/material/Typography";
import React from "react";
import User from "@time-tracker/types/User.ts";

interface UserAutoCompleteOptionProps {
    props,
    user: User
}

export function UserAutoCompleteOption({props, user}: UserAutoCompleteOptionProps) {
    const {key, ...optionProps} = props;

    return <Box
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
}
