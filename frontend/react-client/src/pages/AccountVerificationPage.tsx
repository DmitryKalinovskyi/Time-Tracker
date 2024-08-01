import * as React from 'react';
import {useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

const defaultTheme = createTheme();
const AccountVerificationPage: React.FC = () => {
    const [error, setError] = useState<string>('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get('code') !== '' && data.get('password') !== '' && data.get('repeatPassword') !== '') {
            console.log({
                email: data.get('code'),
                password: data.get('password'),
                repeatPassword: data.get('repeatPassword')
            });
        }

        if (data.get('password') === '' || data.get('repeatPassword') === '' || data.get('code') === '') {
            setError('Please fill in all fields');
            return;
        }

        if (data.get('password') !== data.get('repeatPassword')) {
            setError('Passwords do not match');
            return;
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Verification
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                    <Typography color="error">
                        {error}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Verification
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
