import * as React from 'react';
import {useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
const RegisterPage: React.FC = () => {
    const [error, setError] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get('name') !== '' || data.get('email') !== '') {
            console.log({
                email: data.get('name'),
                password: data.get('email'),
            });
        }

        if (data.get('name') === '' || data.get('email') === '') {
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
                    <AddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create User
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
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
                    />
                    <Typography component="span" color="error">
                        {error}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Create User
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default RegisterPage;