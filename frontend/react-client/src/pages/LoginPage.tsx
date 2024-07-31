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
const LoginPage: React.FC = () => {
    const [error, setError] = useState<string>('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get('password') != '' || data.get('password') != '') {
            console.log({
                email: data.get('email'),
                password: data.get('password'),
            });
        }

        if (data.get('password') === '' || data.get('password') === '') {
            setError('Please fill in all fields');
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
                    Sign in
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
                    <Typography color="error"x>
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
                            <MuiLink component={RouterLink} to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </MuiLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default LoginPage;