import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Card, Chip, Divider, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import User from "../../types/User";
import { StyledMenu } from './StyledMenu';


interface UserProfileProps {
    user: User;
    onSave: (updatedUser: User) => void;
    onUpdateUserActiveStatus: (isActive: boolean) => void;
}

export default function UserProfile(props: UserProfileProps) {
    const { user, onSave, onUpdateUserActiveStatus } = props;

    // Edit profile
    const [editProfileMode, setEditProfileMode] = useState(false);
    const [editedUser, setEditedUser] = useState<User>(user);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSaveProfile = () => {
        onSave(editedUser);
        setEditProfileMode(false);
    };

    // Menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        setEditProfileMode(true);
        handleMenuClose();
    };

    const handleEnableDisableClick = () => {
        onUpdateUserActiveStatus(!user.isActive);
        handleMenuClose();
    };

    if (editProfileMode) {
        return (
            <Card sx={{ margin: '20px auto', padding: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Full Name"
                            name="fullName"
                            value={editedUser.fullName}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" size='small' onClick={handleSaveProfile} sx={{ mr: "5px" }}>
                            Save
                        </Button>
                        <Button variant="contained" size='small' onClick={() => setEditProfileMode(false)}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        )
    }

    return (
        <Card sx={{ margin: '20px auto', padding: 2 }}>
            <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'row' }}>
                <Grid item xs={11}>
                    <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'row' }}>

                        <Grid item xs={12} lg={5}>
                            <Typography variant="h5" component="div">
                                {user.fullName}
                            </Typography>

                            <Divider sx={{ my: '10px' }} />

                            <Typography variant='h6'>
                                General
                            </Typography>

                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography sx={{ ml: '5px' }} color="text.secondary">
                                    Email
                                </Typography>
                                <Typography sx={{ ml: 'auto', mr: "5px" }}>
                                    {user.email}
                                </Typography>
                            </Grid>

                            <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography sx={{ ml: '5px' }} color="text.secondary">
                                    Status
                                </Typography>
                                <Typography sx={{ ml: 'auto', mr: "5px" }}>
                                    {user.isActive ? 'Enabled' : 'Disabled'}
                                </Typography>
                            </Grid>

                            <Divider sx={{ my: '10px' }} />

                            <Typography variant='h6'>
                                Permissions
                            </Typography>
                            <Grid container spacing={1} sx={{ ml: '5px' }}>
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

                            <Divider sx={{ my: '10px' }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: "flex-end" }}>
                    <Grid>
                        <IconButton onClick={handleMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                        <StyledMenu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                            <MenuItem onClick={handleEditClick}>Edit Profile</MenuItem>
                            <MenuItem onClick={handleEditClick}>Edit Permissions</MenuItem>
                            <MenuItem onClick={handleEnableDisableClick}>Enable/Disable</MenuItem>
                        </StyledMenu>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};
