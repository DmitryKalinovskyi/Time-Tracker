import * as React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { verifUserRequest, verifUserFailure } from '../../features/verification/verifSlice.ts';
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
import { RootState } from "../../store.ts";

const defaultTheme = createTheme();

const AccountVerificationPage: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector((state: RootState) => state.verif);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

          // Define a regular expression for a strong password
        const strongPasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;


        if (code === '' || password === '' || repeatPassword === '') {
            dispatch(verifUserFailure('Please fill in all fields'));
            return;
        }

        if (password !== repeatPassword) {
            dispatch(verifUserFailure('Passwords do not match'));
            return;
        }

            if (!strongPasswordRegex.test(password)) {
        dispatch(verifUserFailure('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'));
        return;
    }

        dispatch(verifUserRequest({code, password}));
    };

    useEffect(() => {
        if (success) {
            setCode('');
            setPassword('');
            setRepeatPassword(''); 
        }
    }, [success]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    my: 8,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '550px',
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
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    {(success !== null) && 
                        <Typography
                            color={success !== false ? "success.main" : "error.main"}
                            sx={{ width: '100%', textAlign: 'center' }}>
                            {success !== false ? 'Account activated successfully!' : error}
                        </Typography>
                    }
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
