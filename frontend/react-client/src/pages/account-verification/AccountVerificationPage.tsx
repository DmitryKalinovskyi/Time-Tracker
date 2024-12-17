import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Link as RouterLink} from 'react-router-dom';
import {Link as MuiLink} from '@mui/material';
import {RootState} from "@time-tracker/app/store.ts";
import {useFormik} from "formik";
import {object} from 'yup';
import {verifyUser} from "@time-tracker/pages/account-verification/verifySlice.ts";
import {getPasswordValidation} from "@time-tracker/shared/validation/getPasswordValidation.ts";
import {getConfirmPasswordValidation} from "@time-tracker/shared/validation/getConfirmPasswordValidation.ts";
import {getCodeValidation} from "@time-tracker/shared/validation/getCodeValidation.ts";

export function AccountVerificationPage() {
    const validationSchema = object({
        code: getCodeValidation().required(),
        password: getPasswordValidation().required(),
        confirmPassword: getConfirmPasswordValidation().required()
    });

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            code: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(verifyUser({code: values.code, password: values.password}));
        }
    });

    const { error, loading, success } = useSelector((state: RootState) => state.verify);

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
                <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Verification
                </Typography>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="code"
                        label="Verification Code"
                        name="code"
                        autoComplete="code"
                        autoFocus
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                </form>
            </Box>
    );
}
