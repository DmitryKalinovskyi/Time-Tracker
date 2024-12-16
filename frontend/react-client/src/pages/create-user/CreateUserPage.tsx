import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Box, Button, TextField, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {RootState} from "@time-tracker/app/store.ts";
import {createUser} from "@time-tracker/pages/create-user/createUserSlice.ts";
import {object} from "yup";
import {getEmailValidation} from "@time-tracker/shared/validation/getEmailValidation.ts";
import {useFormik} from "formik";
import {getFullNameValidation} from "@time-tracker/shared/validation/getFullNameValidation.ts";
import {getPositionValidation} from "@time-tracker/shared/validation/getPositionValidation.ts";
import {getWorkHoursPerMonthValidation} from "@time-tracker/shared/validation/getWorkHoursPerMonthValidation.ts";

export function CreateUserPage() {
    const {error, loading, success} = useSelector((state: RootState) => state.createUser);
    const dispatch = useDispatch();

    const validationScheme = object({
        fullName: getFullNameValidation().required(),
        email: getEmailValidation().required(),
        position: getPositionValidation().required(),
        workHoursPerMonth: getWorkHoursPerMonthValidation().required(),
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
