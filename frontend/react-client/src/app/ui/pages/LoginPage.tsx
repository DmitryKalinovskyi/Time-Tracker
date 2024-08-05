import * as React from 'react';
import {useState} from "react";
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
import {authUser} from "../../features/authentification/authSlice.ts";
import useIsAuthenticated from "../../hooks/useIsAuthenticated.ts";


const defaultTheme = createTheme();
const LoginPage: React.FC = () => {

    const [error, setError] = useState<string>('');
    const isAuthenticated = useIsAuthenticated();
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();

        if (email === '' || password === '') {
            setError('Please fill in all fields');
            return;
        }

        dispatch(authUser({email: email ?? '', password: password ?? ''}))
    };

    if(isAuthenticated)
        return <Navigate to={"/"}/>

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
                    <PersonIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                    <Typography color="error">
                        {error}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
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