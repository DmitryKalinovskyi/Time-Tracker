import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Box, Button, TextField, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {RootState} from "@time-tracker/app/store.ts";
import {createUser} from "@time-tracker/pages/create-user/createUserSlice.ts";
import {number, object, string} from "yup";
import {getEmailValidation} from "@time-tracker/shared/validation/getEmailValidation.ts";
import {useFormik} from "formik";

export function CreateUserPage() {
    const {error, loading, success} = useSelector((state: RootState) => state.createUser);
    const dispatch = useDispatch();

    const validationScheme = object({
        fullName: string()
            .matches(/^[[A-Za-z]* [A-Za-z]*$/, "Full name should consist of two parts (Ivan Ivanovich).")
            .matches(/^[A-Z][a-z]* [A-Za-z]*$/, "First name should start with a capital letter.")
            .matches(/^[A-Z][a-z]* [A-Z][a-z]*$/, "Last name should start with a capital letter.")
            .matches(/^[A-Z][a-z]{0,50} [A-Z][a-z]{0,50}$/, "First and last name could have at most 50 characters.")
            .required("Full Name is required."),

        email: getEmailValidation().required("Email is required."),
        position: string().required("Position is required."),
        workHoursPerMonth: number().integer()
            .min(0, "Work hours per month should be at least 0.")
            .max(720, "Work hours per month should be at most 720.")
            .required("Work hours is required."),

    })

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            position: "",
            workHoursPerMonth: 160
        },
        validationSchema: validationScheme,
        onSubmit: (values) => {
            dispatch(createUser({
                fullName: values.fullName,
                email: values.email,
                position: values.position,
                workHoursPerMonth: values.workHoursPerMonth
            }))
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
            <Avatar sx={{m: 1, backgroundColor: 'secondary.main'}}>
                <AddIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Create User
            </Typography>
            <Box sx={{mt: 1, width: '100%'}}>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoComplete="fullName"
                        autoFocus
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
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
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Position"
                        autoComplete="position"
                        name="position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        error={formik.touched.position && Boolean(formik.errors.position)}
                        helperText={formik.touched.position && formik.errors.position}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        inputProps={{type: 'number'}}
                        name="workHoursPerMonth"
                        label="Work hours per month"
                        value={formik.values.workHoursPerMonth}
                        onChange={formik.handleChange}
                        error={formik.touched.workHoursPerMonth && Boolean(formik.errors.workHoursPerMonth)}
                        helperText={formik.touched.workHoursPerMonth && formik.errors.workHoursPerMonth}
                    />
                    {(success !== null) &&
                        <Typography
                            color={success !== false ? "success.main" : "error.main"}
                            sx={{width: '100%', textAlign: 'center'}}>
                            {success !== false ? 'User created successfully!' : error}
                        </Typography>
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 1, mb: 2}}
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create User'}
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
