import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';

import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <AppBar position="static" className="bg-blue-800 shadow-md">
      <Toolbar className="flex justify-end space-x-4">
        <Typography variant="h6" className="text-white">
          {user?.fullName}
        </Typography>
        <IconButton edge="end" color="inherit">
          <Avatar alt={user?.fullName}/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
