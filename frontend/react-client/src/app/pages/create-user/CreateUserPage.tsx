import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Avatar, Button, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { registerUserFailure } from '@time-tracker/features/registration/registerSlice.ts';
import { RootState } from '../../store.ts';
import { registerUserRequest } from '@time-tracker/features/registration/registerSlice.ts';

export const CreateUserPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [workHoursPerMonth, setWorkHoursPerMonth] = useState(160);

    const dispatch = useDispatch();

    const { error, loading, success } = useSelector((state: RootState) => state.reg);

    useEffect(() => {
        if (success) {
            setFullName('');
            setEmail('');
            setPosition('');
            setWorkHoursPerMonth(160);
        }
    }, [success]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    
        if (fullName === '' || email === '') {
            dispatch(registerUserFailure('Please fill in all fields'));
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            dispatch(registerUserFailure('Please enter a valid email address'));
            return;
        }
    
        const nameParts = fullName.trim().split(' ');
        const nameValidation = nameParts.every(name => /^[A-Z][a-z]*$/.test(name));
        
        if (!nameValidation) {
            dispatch(registerUserFailure('Each name must start with a capital letter'));
            return;
        }
    
        dispatch(registerUserRequest({ fullName, email, position, workHoursPerMonth}));
    };

    return (
        <Box
            sx={{
                my: 8,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '550px',
                width: '100%',
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Position"
                    autoComplete="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    inputProps={{ type: 'number'}}
                    label="Work hours per month"
                    value={workHoursPerMonth}
                    onChange={(e) => setWorkHoursPerMonth(+e.target.value)}
                />
                {(success !== null) && 
                <Typography
                    color={success !== false ? "success.main" : "error.main"}
                    sx={{ width: '100%', textAlign: 'center' }}>
                    {success !== false ? 'User created successfully!' : error}
                </Typography>
                }

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
