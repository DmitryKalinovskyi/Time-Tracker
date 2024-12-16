import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Box, Button, Link as MuiLink, TextField, Typography} from '@mui/material';
import PasswordIcon from '@mui/icons-material/Password';
import {resetPassword} from '@time-tracker/pages/reset-password/resetPasswordSlice.ts';
import Grid from "@mui/material/Grid";
import {Link as RouterLink} from "react-router-dom";
import {RootState} from "@time-tracker/app/store.ts";
import {useFormik} from "formik";
import {object, string} from "yup"
import {getEmailValidation} from "@time-tracker/shared/validation/getEmailValidation.ts";

export const ResetPasswordPage: React.FC = () => {
    const dispatch = useDispatch();

    const { error, loading, success } = useSelector((state: RootState) => state.resetPassword);

    const validationScheme = object({
        email: getEmailValidation()
    })

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: validationScheme,
        onSubmit: (values) => {
            dispatch(resetPassword({email: values.email}));
        }
    })

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
            <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
                <PasswordIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Reset Password
            </Typography>
                <Box sx={{ mt: 1, width: '100%' }}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        id="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
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
                </form>
                </Box>
        </Box>
    );
};

