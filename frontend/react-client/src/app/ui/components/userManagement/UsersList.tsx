import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/users/usersEpics";
import { RootState } from "../../../store";
import { useNavigate } from 'react-router-dom';
import Pagination from "@mui/material/Pagination";
import {UsersPage} from "../../../features/users/usersSlice.ts";

export default function UsersList() {
    const navigate = useNavigate();
    const [itemsPerPage, _setItemsPerPage] = useState<number>(5);

    const usersPage: UsersPage = useSelector((state: RootState) => state.users.usersPage);
    console.log(usersPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers({pageNumber: 1, pageSize: itemsPerPage}));
    }, [dispatch, itemsPerPage]);

    const handlePageChange = (page: number) => {
        dispatch(fetchUsers({pageNumber: page, pageSize: itemsPerPage}));
    }

    return (
        <>
            <Container maxWidth="md">
                {usersPage.results ?
                    <Box my={4}>
                        <Grid container direction="column" spacing={1}>

                            {usersPage.results.map((user) => (
                                <Grid item xs={12} sm={6} key={user.id}>
                                    <Card variant="outlined" sx={{ padding: '8px' }}>
                                        <CardContent sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0',
                                            '&:last-child': { pb: 0 }
                                        }}>
                                            <Box>
                                                <Typography variant="h6" component="div">
                                                    {user.fullName}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                            <Button size="small" variant="outlined" onClick={() => navigate("/user/" + user.id)}>View Profile</Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box mt={4} display="flex" justifyContent="center">
                            {usersPage.totalPages > 1 &&
                            <Pagination count={usersPage.totalPages}
                                        page={usersPage.currentPage}
                                        onChange={(e, page) => handlePageChange(page)}/>
                            }
                            {/*<IconButton disabled={!usersPage.pageInfo.hasPreviousPage}*/}
                            {/*    onClick={handlePreviousPage}>*/}
                            {/*    <NavigateBeforeIcon />*/}
                            {/*</IconButton>*/}
                            {/*<IconButton disabled={!usersPage.pageInfo.hasNextPage}*/}
                            {/*    onClick={handleNextPage}>*/}
                            {/*    <NavigateNextIcon />*/}
                            {/*</IconButton>*/}
                        </Box>
                    </Box>
                    : <></>
                }
            </Container>
        </>
    );
};