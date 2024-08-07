import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const defaultTheme = createTheme();

const RoleManagementPage: React.FC = () => {
    const rows = [
        {name: "Role 1"},
        {name: "Role 2"},
        {name: "Role 3"},
        {name: "Role 4"},
    ]
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    p: 8,
                }}
            >
                <Button item xs={1} variant="contained">
                    Create Role
                </Button>

                <TableContainer component={Paper} sx={{mt: 2}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    hover
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" sx={{mr: 2}}>Edit</Button>
                                        <Button variant="contained" color="error">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ThemeProvider>
    );
};

export default RoleManagementPage;
