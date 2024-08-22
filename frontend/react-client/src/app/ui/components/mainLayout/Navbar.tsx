import React, { useState } from 'react';
import { Toolbar, Typography, IconButton, Avatar, MenuItem, Menu } from '@mui/material';

import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { OnlineStyledBadge } from './OnlineStyledBadge';
import { logout } from '../../../features/authentification/authSlice';

export const stringAvatar = (name: string) => {
  return {
    sx : {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }
}

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

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
        <MenuItem onClick={handleLogout}>
          <Typography variant="body2" color="text.secondary">Logout</Typography>
        </MenuItem>
      </Menu>
      </Toolbar>
  );
};

export default Navbar;
