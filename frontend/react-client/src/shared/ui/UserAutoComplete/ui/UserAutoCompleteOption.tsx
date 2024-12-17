import Box from "@mui/material/Box";
import {Avatar} from "@mui/material";
import {stringAvatar} from "@time-tracker/shared/misc/stringHelper.ts";
import Typography from "@mui/material/Typography";
import React from "react";
import User from "../../../../types/User.ts";

interface UserAutoCompleteOptionProps {
    props,
    user: User
}

export function UserAutoCompleteOption({props, user}: UserAutoCompleteOptionProps) {
    const {key, ...optionProps} = props;

    return <Box
        component="li"
        {...optionProps}
    >
        <Avatar {...stringAvatar(user.fullName)}/>
        <Box>
            <Box>
                <Typography sx={{ml: 2}}>
                    {user.fullName}
                </Typography>
            </Box>
            <Box>
                <Typography sx={{ml: 2}} color="secondary">
                    {user.email}
                </Typography>
            </Box>
        </Box>
    </Box>
}
