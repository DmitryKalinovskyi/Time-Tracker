import EmailIcon from '@mui/icons-material/Email';
import { Box, Card, Chip, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../features/user/userEpics";
import { RootState } from "../../store";
import User from "../../types/User";


interface UserProfileProps {
    user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <Card sx={{ margin: '20px auto', padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Typography variant="h6" component="div">
                        {user.fullName}
                    </Typography>
                    <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <EmailIcon sx={{ marginRight: '5px' }} /> {user.email}
                    </Typography>
                    <Typography variant="body2" color={user.isActive ? 'green' : 'gray'} fontWeight="bold">
                        {user.isActive ? 'Active' : 'Inactive'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                        Permissions:
                    </Typography>
                    <Grid container spacing={1}>
                        {user.permissions.map((permission, index) => (
                            <Grid item key={index}>
                                <Chip
                                    label={permission}
                                    color="primary"
                                    variant="outlined"
                                    size="small"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

export default function UserPage() {
    const { UserId } = useParams();

    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser(parseInt(UserId!)));
    }, [UserId]);

    useEffect(() => {
        console.log(user, user != null)
    }, [user]);
    return (
        <>
            <Box sx={{ p: 1 }} >
                {user.id ?
                    <UserProfile user={user} />
                    : "User not found"}
            </Box>
        </>
    );
};
