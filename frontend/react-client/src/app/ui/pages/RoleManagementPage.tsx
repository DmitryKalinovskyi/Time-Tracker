import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Dialog,
    DialogActions,
    DialogContent, DialogContentText, DialogTitle, Divider, List, ListItem, ListItemIcon, ListItemText, ListSubheader,
    Paper, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import Role from "../../types/Role.ts";
import {addRole, removeRole, updateRole} from "../../features/roles/rolesSlice.ts";

const defaultTheme = createTheme();

const RoleManagementPage: React.FC = () => {
    const permissions = useSelector((state: RootState) => state.roles.permissions);
    const roles = useSelector((state: RootState) => state.roles.roles);
    const dispatch = useDispatch();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editRole, setEditRole] = useState<Role|null>(null);

    function startEditRole(id: number){
        setEditModalOpen(true);
        setEditRole(roles.filter(r => r.id == id)[0]);
    }

    function stopEditRole(){
        setEditModalOpen(false);
    }

    function createNewRole(){
        dispatch(addRole( {id: (Math.floor(Math.random() * 20000)), name: "New Role", permissions: []}))
    }

    function togglePermission(permission: string){
        if(editRole == null) return;

        if(editRole.permissions.indexOf(permission) != -1){
            setEditRole({
                ...editRole,
                permissions: editRole.permissions.filter(p => p != permission)
            })
        }
        else{
            setEditRole({
                ...editRole,
                permissions: [...editRole.permissions, permission]
            })
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    p: 8,
                }}
            >
                <Button item xs={1}
                        onClick={() => createNewRole()}
                        variant="contained">
                    Create Role
                </Button>

                <TableContainer component={Paper} sx={{mt: 2}}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow
                                    hover
                                    key={role.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {role.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained"
                                                sx={{mr: 2}}
                                                onClick={() => startEditRole(role.id)}
                                        >Edit</Button>
                                        <Button variant="contained"
                                                color="error"
                                                onClick={() => dispatch(removeRole(role.id))}
                                        >Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {editRole &&
                <Dialog
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                >
                    <DialogTitle>Edit Role</DialogTitle>
                    <DialogContent sx={{minWidth: 460}}>
                        <TextField
                            value={editRole.name}
                            onChange={(e) => setEditRole({...editRole, name: e.target.value}) }
                            required
                            label="Role name"
                            // variant="standard"
                            fullWidth
                            margin="dense"
                            />
                        <Divider sx={{my: 2}}/>
                        <Typography >Permissions</Typography>
                        <List>
                            {permissions.map((p, index) =>
                            <ListItem sx={{px: 0}} key={index}>
                                <ListItemText primary={p} />
                                <Switch
                                    edge="end"
                                    onChange={() => togglePermission(p)}
                                    checked={editRole.permissions.indexOf(p) !== -1}
                                />
                            </ListItem>
                            )}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {editRole && dispatch(updateRole(editRole)); stopEditRole();}}>
                            Update
                        </Button>
                        <Button onClick={() => stopEditRole()} color="error">Cancel</Button>
                    </DialogActions>
                </Dialog>
                }
            </Box>
        </ThemeProvider>
    );
};

export default RoleManagementPage;
