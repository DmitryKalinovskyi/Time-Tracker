import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import {Link as RouterLink} from 'react-router-dom';
import {Link as MuiLink} from '@mui/material';
import {useDispatch} from "react-redux";
import {loginUser} from "@time-tracker/shared/authentication/authSlice.ts";
import useAuth from "@time-tracker/shared/authentication/hooks/useAuth.ts";
import {object, string} from "yup";
import {useFormik} from "formik";
import {getEmailValidation} from "@time-tracker/shared/validation/getEmailValidation.ts";

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();

    const validationScheme = object({
        email: getEmailValidation(),
        password: string()
        // password: getPasswordValidation()
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationScheme,
        onSubmit: (values) => {
            dispatch(loginUser({email: values.email, password: values.password}));
        }
    })

    const auth = useAuth();

    return (
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
            <Avatar sx={{m: 1, backgroundColor: 'secondary.main'}}>
                <PersonIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>
            <Box sx={{mt: 1, width: '100%'}}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    {auth.error &&
                        <Typography
                            color={"error.main"}
                            sx={{width: '100%', textAlign: 'center'}}>
                            {auth.error}
                        </Typography>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 1, mb: 2}}
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
                </form>
            </Box>
        </Box>
    );
};