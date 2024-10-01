import Button from "@mui/material/Button";
import React, {useState} from "react";
import {
    FormControlLabel, FormGroup,
    Paper,
    Stack, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    TableSortLabel
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Dmytro Kalinovskyi', 159, 6.0, 24, 4.0),
    createData('Sasha ZAi', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export function ReportsPage(){
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return <>
        <Stack m={2}>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" m={2} spacing={2} alignItems="center">
                    <Button variant="contained">Download .xlsm</Button>
                    <Button variant="contained">Download .csv</Button>

                    <DatePicker
                        label={'View by Month'}
                        openTo="month"
                        views={['year', 'month']}
                    />
                </Stack>

                <Stack direction="row"  m={2} spacing={2} alignItems="center">
                    {/*<Button color="secondary" onClick={() => dispatch(changeSelectedUser(me))} variant="contained">View my</Button>*/}
                </Stack>
            </Stack>
            <Paper>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }}
                           aria-labelledby="tableTitle"
                           size={dense ? 'small' : 'medium'}
                        aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Worker</TableCell>
                                <TableCell align="right">Work hours</TableCell>
                                <TableCell align="right">Hospital days</TableCell>
                                <TableCell align="right">Leave days</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="row" alignItems="stretch">
                        <FormControlLabel sx={{m: 0}} control={<Switch checked={dense}
                                                                       onChange={(e, checked) => setDense(checked)}/>}
                                          label="Dense" />
                    <TablePagination
                        sx={{m: 0}}
                        rowsPerPageOptions={[5, 10, 25]}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Stack>
            </Paper>


        </Stack>
    </>
}