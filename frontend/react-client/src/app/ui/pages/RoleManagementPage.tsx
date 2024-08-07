import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Input} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const defaultTheme = createTheme();

const RoleManagementPage: React.FC = () => {

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    p: 8,
                }}
            >
            <Grid container direction="row">
                <Input item xs={2}/>
                <Button item xs={1}>
                    Create Role
                </Button>
            </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default RoleManagementPage;
