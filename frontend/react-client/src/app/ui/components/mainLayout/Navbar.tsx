import React, { useState } from 'react';
import { Toolbar, Typography, IconButton, Avatar, MenuItem, Menu } from '@mui/material';

import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { OnlineStyledBadge } from './OnlineStyledBadge';
import { logout } from '../../../features/authentification/authSlice';
import {stringAvatar} from "../../../misc/StringHelper.ts";
import {Link} from "react-router-dom";
import useAuth from "../../../hooks/useAuth.ts";





const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    handleClose(); // Close the menu after logging out
  };
  return (
      <Toolbar className="flex justify-end space-x-4 m-0" sx={{boxShadow: '0 7px 7px -5px rgba(0, 0, 0, 0.4)'}} >
        <Typography variant="h5" sx={{color: "#00101D" }}>
          {user?.fullName}
        </Typography>
        <IconButton edge="end" onClick={handleClick}>
          <OnlineStyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
            <Avatar {...stringAvatar(user?.fullName ?? "")}/>
          </OnlineStyledBadge>
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
            <MenuItem component={Link} to={`user/${user.id}`}>
              <Typography variant="body2" color="text.secondary">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <Typography variant="body2" color="text.secondary">Logout</Typography>
            </MenuItem>
      </Menu>
      </Toolbar>
  );
};

export default Navbar;
