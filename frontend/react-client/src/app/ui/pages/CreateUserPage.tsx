import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Avatar, Button, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { clearError, clearCreateUserSuccess, createUserFailure, createUserRequest } from '../../../state/user/userSlice.ts';
import { RootState } from '../../../state/store.ts';

const CreateUserPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { error, loading, createUserSuccess } = useSelector((state: RootState) => state.user);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (fullName === '' || email === '') {
            dispatch(clearError());
            dispatch(createUserFailure('Please fill in all fields'));
            return;
        }

        dispatch(createUserRequest({ fullName, email }));
    };

    useEffect(() => {
        if (createUserSuccess) {
            setFullName('');
            setEmail('');
            setTimeout(() => {
                dispatch(clearCreateUserSuccess());
            }, 3000);
        }
    }, [createUserSuccess, dispatch]);

    return (
        <Box
            sx={{
                my: 8,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '500px',
                width: '100%'
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Create User
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoComplete="fullName"
                    autoFocus
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email Address"
                    type="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {(error || createUserSuccess) && (
                    <Typography
                        color={createUserSuccess ? "success.main" : "error.main"}
                        sx={{ width: '100%', textAlign: 'center' }}
                    >
                        {createUserSuccess ? 'User created successfully!' : error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create User'}
                </Button>
            </Box>
        </Box>
    );
};

export default CreateUserPage;
