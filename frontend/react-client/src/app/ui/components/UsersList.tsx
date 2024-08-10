import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Box, Button, Card, CardContent, Container, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersEpics";
import { RootState } from "../../store";

export default function UsersList() {
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    const usersPage = useSelector((state: RootState) => state.users.usersPage);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers({ first: itemsPerPage, after: null, last: null, before: null }));
    }, [itemsPerPage]);

    const handlePreviousPage = () => {
        if (!usersPage.pageInfo.hasPreviousPage) return;
        dispatch(fetchUsers({ first: null, after: null, last: itemsPerPage, before: usersPage.pageInfo.startCursor }));
    };

    const handleNextPage = () => {
        if (!usersPage.pageInfo.hasNextPage) return;
        dispatch(fetchUsers({ first: itemsPerPage, after: usersPage.pageInfo.endCursor, last: null, before: null }));
    };

    return (
        <>
            <Container maxWidth="md">
                {usersPage.edges ?
                    <Box my={4}>
                        <Grid container direction="column" spacing={1}>

                            {usersPage.edges.map((node) => (
                                <Grid item xs={12} sm={6} key={node.node.id}>
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
                                                    {node.node.fullName}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {node.node.email}
                                                </Typography>
                                            </Box>
                                            <Button size="small" variant="outlined">View Profile</Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box mt={4} display="flex" justifyContent="center">
                            <IconButton disabled={!usersPage.pageInfo.hasPreviousPage}
                                onClick={handlePreviousPage}>
                                <NavigateBeforeIcon />
                            </IconButton>
                            <IconButton disabled={!usersPage.pageInfo.hasNextPage}
                                onClick={handleNextPage}>
                                <NavigateNextIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    : <></>
                }
            </Container>
        </>
    );
};