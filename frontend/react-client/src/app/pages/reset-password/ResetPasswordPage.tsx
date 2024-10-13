import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Box, Avatar, Button, TextField, Typography, Link as MuiLink} from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import { resetUserPasswordFailure, resetUserPasswordRequest } from '@time-tracker/features/resetPassword/resetSlice.ts';
import { RootState } from '../../store.ts';
import Grid from "@mui/material/Grid";
import {Link as RouterLink} from "react-router-dom";

export const ResetPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const { error, loading, success } = useSelector((state: RootState) => state.reset);

    useEffect(() => {
        if (success) {
            setEmail('');
        }
    }, [success]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (email === '') {
            dispatch(resetUserPasswordFailure('Please fill in email'));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            dispatch(resetUserPasswordFailure('Please enter a valid email address'));
            return;
        }

        dispatch(resetUserPasswordRequest({ email }));
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
                <PasswordIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Reset Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
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
                {(success !== null) &&
                    <Typography
                        color={success ? "success.main" : "error.main"}
                        sx={{ width: '100%', textAlign: 'center' }}>
                        {success ? 'Password reset code has been sent to your email, please go to the verification page' : error}
                    </Typography>
                }

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Reset Password'}
                </Button>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <MuiLink component={RouterLink} to="/login" variant="body2">
                            {"Sign In"}
                        </MuiLink>
                    </Grid>
                    <Grid item>
                        <MuiLink component={RouterLink} to="/verification" variant="body2">
                            {"Account verification"}
                        </MuiLink>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

