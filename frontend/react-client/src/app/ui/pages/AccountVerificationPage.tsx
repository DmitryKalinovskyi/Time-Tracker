import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserRequest } from '../../../state/user/userSlice.ts';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { RootState } from "../../../state/store.ts";

const defaultTheme = createTheme();

const AccountVerificationPage: React.FC = () => {
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch();
    const { verificationSuccess, loading, error: verifyError } = useSelector((state: RootState) => state.user);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get('code') === '' || data.get('password') === '' || data.get('repeatPassword') === '') {
            setError('Please fill in all fields');
            return;
        }

        if (data.get('password') !== data.get('repeatPassword')) {
            setError('Passwords do not match');
            return;
        }

        const verificationData = {
            code: data.get('code'),
            password: data.get('password')
        };

        dispatch(verifyUserRequest(verificationData));
    };

    useEffect(() => {
        if (verifyError) {
            setError(verifyError);
        }
    }, [verifyError]);

    useEffect(() => {
        if (verificationSuccess) {
            setError('');
        }
    }, [verificationSuccess]);

    let message = '';
    let messageColor: string = '';
    let linkColor: string = '';

    if (error) {
        message = error;
        messageColor = 'red';
        linkColor = 'red';
    } else if (verificationSuccess) {
        message = 'Verification successful! You can now ';
        messageColor = 'green';
        linkColor = 'green';
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    my: 8,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '400px',
                    width: '100%'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Verification
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="code"
                        label="Verification Code"
                        name="code"
                        autoComplete="code"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="repeatPassword"
                        label="Repeat Password"
                        type="password"
                        id="repeatPassword"
                        autoComplete="current-password"
                    />
                    {message && (
                        <Typography sx={{ width: '100%', textAlign: 'center', color: messageColor }}>
                            {message}
                            {verificationSuccess && (
                                <MuiLink
                                    component={RouterLink}
                                    to="/login"
                                    sx={{
                                        color: linkColor,
                                        textDecoration: 'underline',
                                        ':hover': {
                                            textDecoration: 'none'
                                        }
                                    }}
                                >
                                    login
                                </MuiLink>
                            )}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </Button>
                    <Grid item>
                        <MuiLink component={RouterLink} to="/login" variant="body2">
                            {"Do you have an account? Sign In"}
                        </MuiLink>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default AccountVerificationPage;
