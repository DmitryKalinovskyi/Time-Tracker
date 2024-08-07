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
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const defaultTheme = createTheme();

const RoleManagementPage: React.FC = () => {
    const [avaiblePermissions, setAvaiblePermissions] = useState([
        "Manage Users",
        "Manage Roles",
    ])
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editRole, setEditRole] = useState<object>({name: "", permissions: []});
    const [roles, setRoles] = useState(
        [
            {id: 1, name: "Role 1", permissions: ["Manage Users"]},
            {id: 2, name: "Role 2", permissions: []},
            {id: 3, name: "Role 3", permissions: []},
            {id: 4, name: "Role 4", permissions: ["Manage Roles"]},
        ]
    )

    function startEditRole(id: number){
        setEditModalOpen(true);
        setEditRole(roles.filter(r => r.id == id)[0]);
    }

    function stopEditRole(){
        setEditModalOpen(false);
    }

    function updateRole(role){
        setRoles([...roles.filter(r => r.id != role.id), role]);
        stopEditRole();
    }

    function createNewRole(){
        setRoles([...roles, {id: (Math.floor(Math.random() * 20000)), name: "New Role", permissions: []}]);
    }

    function deleteRole(id: number){
        setRoles(roles.filter(r => r.id != id));
    }

    function togglePermission(permission: string){
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
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                    key={role.name}
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
                                                onClick={() => deleteRole(role.id)}
                                        >Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                >
                    <DialogTitle>Edit Role</DialogTitle>
                    <DialogContent sx={{minWidth: 460}}>
                        <TextField
                            value={editRole.name}
                            onChange={(e) => setEditRole({...editRole, name: e.target.value}) }
                            autoFocus
                            required
                            label="Role name"
                            // variant="standard"
                            fullWidth
                            margin="dense"
                            />
                        <Divider sx={{my: 2}}/>
                        <Typography >Permissions</Typography>
                        <List>
                            {avaiblePermissions.map((p, index) =>
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
                        <Button onClick={() => updateRole(editRole)}>Update</Button>
                        <Button onClick={() => stopEditRole()} color="error">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>


        </ThemeProvider>
    );
};

export default RoleManagementPage;
