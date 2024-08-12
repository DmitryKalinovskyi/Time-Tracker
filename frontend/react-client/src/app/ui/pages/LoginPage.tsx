import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as RouterLink, Navigate} from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import {useDispatch} from "react-redux";
import {authUser, authUserFailure} from "../../features/authentification/authSlice.ts";
import useIsAuthenticated from "../../hooks/useIsAuthenticated.ts";
import useAuth from "../../hooks/useAuth.ts";
import { useEffect, useState } from 'react';


const defaultTheme = createTheme();
const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const auth = useAuth();
    const isAuthenticated = useIsAuthenticated();
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.success) {
            setEmail('');
            setPassword(''); 
        }
    }, [auth.success]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Email validation using RegExp
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Check if email or password is missing
        if (!email || !password) {
            dispatch(authUserFailure('Please fill in all fields'));
            return;
        }
    
        // Check if the email is valid
        if (!emailRegex.test(email)) {
            dispatch(authUserFailure('Please enter a valid email address'));
            return;
        }
    
        // Dispatch the authUser action
        dispatch(authUser({ email, password }));
    };

    if(isAuthenticated)
        return <Navigate to={"/"}/>

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
                    <PersonIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                {(auth.success !== null) && 
                <Typography
                    color={auth.success !== false ? "success.main" : "error.main"}
                    sx={{ width: '100%', textAlign: 'center' }}>
                    {auth.success !== false ? 'Authenticated successfully!' : auth.error}
                </Typography>
                }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <MuiLink component={RouterLink} to="/reset" variant="body2">
                                {"Forgot password?"}
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
        </ThemeProvider>
    );
};

export default LoginPage;