import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" className="bg-blue-800 shadow-md">
      <Toolbar className="flex justify-between">
        <div className="flex items-center space-x-2">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="text-white">
            Time Tracker
          </Typography>
        </div>
        <div className="space-x-4">
          <Button color="inherit" className="hover:bg-blue-700">
            Home
          </Button>
          <Button color="inherit" className="hover:bg-blue-700">
            Features
          </Button>
          <Button color="inherit" className="hover:bg-blue-700">
            About
          </Button>
          <Button color="inherit" className="hover:bg-blue-700">
            Contact
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
