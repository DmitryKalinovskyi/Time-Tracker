import Button from "@mui/material/Button";
import React, {useEffect, useRef, useState} from "react";
import {
    CircularProgress,
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
import {useDispatch, useSelector} from "react-redux";
import {fetchWorkReport, WorkReportingState} from "../../features/workReporting/workReportingSlice.ts";
import {RootState} from "../../store.ts";
import {getMonthTimeRange} from "../../misc/DateHelper.ts";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";


export function ReportsPage(){
    const [dense, setDense] = useState(true);
    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 5,
        from: new Date(),
        to: new Date()
    });

    const workReportingState: WorkReportingState = useSelector((state: RootState) => state.workReporting);

    const dispatch = useDispatch();
    useEffect(() => {
        handleChangeMonth(new Date());
    }, []);

    useEffect(() => {
        dispatch(fetchWorkReport({
            pageSize: pagination.pageSize,
            page: pagination.page,
            from: pagination.from,
            to: pagination.to
        }));
    }, [dispatch, pagination]);

    const handleChangePage = (page: number) => {
        console.log(page);
        setPagination({...pagination, page});
    }

    // const handleChangeRowsPerPage = (pageSize: number) => {
    //     setPagination({...pagination, pageSize});
    // }

    const handleChangeMonth = (month: Date) => {
        const {from, to} = getMonthTimeRange(month);
        setPagination({...pagination, from, to});
    }

    return <>
        <Stack m={2}>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" m={2} spacing={2} alignItems="center">
                    <Button variant="contained">Download .xlsm</Button>
                    {/*<Button variant="contained">Download .csv</Button>*/}

                    <DatePicker
                        value={dayjs(pagination.from)}
                        onChange={(value) => handleChangeMonth(value.toDate())}
                        label={'View by Month'}
                        openTo="month"
                        views={['year', 'month']}
                    />
                </Stack>

                <Stack direction="row"  m={2} spacing={2} alignItems="center">
                    {/*<Button color="secondary" onClick={() => dispatch(changeSelectedUser(me))} variant="contained">View my</Button>*/}
                </Stack>
            </Stack>
            {workReportingState.isFetching &&
                <CircularProgress/>
            }
            {workReportingState.workReport && !workReportingState.isFetching &&
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
                            { workReportingState.workReport.users.map((userReport) => (
                                <TableRow
                                    key={userReport.user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {userReport.user.fullName}
                                    </TableCell>
                                    <TableCell align="right">{userReport.trackedHours}</TableCell>
                                    <TableCell align="right">0</TableCell>
                                    <TableCell align="right">0</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="row" alignItems="stretch">
                        <FormControlLabel sx={{m: 0}} control={<Switch checked={dense}
                                                                       onChange={(e, checked) => setDense(checked)}/>}
                                          label="Dense" />
                    {workReportingState.workReport.pageCount > 1 &&
                    <Pagination count={workReportingState.workReport.pageCount}
                                page={pagination.page + 1}
                                onChange={(e, page) => handleChangePage(page-1)}

                    />}
                    {/*<TablePagination*/}
                    {/*    sx={{m: 0}}*/}
                    {/*    rowsPerPageOptions={[5, 10, 25]}*/}
                    {/*    count={workReportingState.workReport.users.length}*/}
                    {/*    rowsPerPage={workReportingState.workReport.pageSize}*/}
                    {/*    page={workReportingState.workReport.page}*/}
                    {/*    onPageChange={(e, page) => handleChangePage(page)}*/}
                    {/*    onRowsPerPageChange={(e) => handleChangeRowsPerPage(e.target.value)}*/}
                    {/*/>*/}
                </Stack>
            </Paper>
            }


        </Stack>
    </>
}