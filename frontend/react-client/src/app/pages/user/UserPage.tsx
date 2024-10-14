import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, updateUser, updateUserActiveStatus, updateUserPermissions } from "@time-tracker/features/user/userEpics.ts";
import { RootState } from "../../store.ts";
import UserProfile from './ui/UserProfile.tsx';
import User from "@time-tracker/types/User.ts";
import { fetchPermissions } from "@time-tracker/features/permissions/permissionsEpics.ts";

export function UserPage() {
    const { UserId } = useParams();

    const user = useSelector((state: RootState) => state.user.user);
    const error = useSelector((state: RootState) => state.user.error);
    const permisisons = useSelector((state: RootState) => state.permissions.permissions);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser(parseInt(UserId!)));
    }, [UserId]);

    const HandleSaveUserProfile = (user: User) => {
        dispatch(updateUser(
            {
                id: user.id,
                fullName: user.fullName,
                email: user.email
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

    const HandleGetPermissions = () => {
        dispatch(fetchPermissions());
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
                    onUpdateUserActiveStatus={HandleUpdateUserActiveStatus} 
                    getPermissions={HandleGetPermissions}
                    availablePermissions={permisisons}/>
                    : error}
            </Box>
        </>
    );
};
