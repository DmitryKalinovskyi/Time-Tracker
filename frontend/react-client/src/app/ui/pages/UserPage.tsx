import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, updateUser, updateUserActiveStatus } from "../../features/user/userEpics";
import { RootState } from "../../store";
import UserProfile from '../components/UserProfile';
import User from "../../types/User";

export default function UserPage() {
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

    return (
        <>
            <Box sx={{ p: 1 }} >
                {user.id ?
                    <UserProfile user={user} onSave={HandleSaveUserProfile} onUpdateUserActiveStatus={HandleUpdateUserActiveStatus} />
                    : error}
            </Box>
        </>
    );
};
