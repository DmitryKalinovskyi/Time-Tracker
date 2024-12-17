import React, {useState} from 'react';
import {Avatar, IconButton, MenuItem, Toolbar, Typography} from '@mui/material';

import {useDispatch, useSelector} from 'react-redux';
import {OnlineStyledBadge} from './OnlineStyledBadge.tsx';
import {logout} from '@time-tracker/shared/authentication/authSlice.ts';
import {stringAvatar} from "@time-tracker/shared/misc/StringHelper.ts";
import {Link} from "react-router-dom";
import {StyledMenu} from "@time-tracker/shared/ui/StyledMenu";
import {RootState} from "@time-tracker/app/store.ts";


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
        <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
            <MenuItem onClick={handleClose} component={Link} to={`user/${user.id}`}
                      >Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </StyledMenu>
      </Toolbar>
  );
};

export default Navbar;
