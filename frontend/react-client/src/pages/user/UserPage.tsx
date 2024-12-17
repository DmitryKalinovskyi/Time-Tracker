import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserProfile from './ui/UserProfile.tsx';
import User from "../../types/User.ts";
import {RootState} from "@time-tracker/app/store.ts";
import {
    fetchUser,
    updateUser,
    updateUserActiveStatus,
    updateUserPermissions
} from "@time-tracker/pages/user/userSlice.ts";

export function UserPage() {
    const { UserId } = useParams();

    const user = useSelector((state: RootState) => state.user.user);
    const error = useSelector((state: RootState) => state.user.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser(parseInt(UserId!)));
    }, [UserId]);

    const HandleSaveUserProfile = (user: User) => {
        dispatch(updateUser(
            {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                position: user.position,
                workHoursPerMonth: user.workHoursPerMonth
            }
        ));
    };

    const HandleUpdateUserActiveStatus = (isActive: boolean) => {
        dispatch(updateUserActiveStatus(
            {
                id: user.id,
                isActive: isActive
            }
        ));
    };

    const HandleSaveUserPermissions = (permissions: string[]) => {
        dispatch(updateUserPermissions(
            {
                id: user.id,
                permissions: permissions
            }
        ))
    };

    return (
        <>
            <Box sx={{ p: 1 }} >
                {user.id ?
                    <UserProfile user={user} 
                    onSaveProfile={HandleSaveUserProfile} 
                    onSavePermissions={HandleSaveUserPermissions} 
                    onUpdateUserActiveStatus={HandleUpdateUserActiveStatus}/>
                    : error}
            </Box>
        </>
    );
};
