import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Dashboard as DashboardIcon, AccessTime as AccessTimeIcon, DateRange as DateRangeIcon, Settings as SettingsIcon } from '@mui/icons-material';

const drawerWidth = 280;

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#2c3e50', color: 'white', height: '100vh' },
      }}
    >
      <Toolbar className="flex justify-center items-center py-4">
        <Typography variant="h6" noWrap className="text-white">
          Time Tracker
        </Typography>
      </Toolbar>
      <div className="overflow-auto">
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon /> },
            { text: 'Time Tracker', icon: <AccessTimeIcon /> },
            { text: 'Calendar', icon: <DateRangeIcon /> },
            { text: 'Settings', icon: <SettingsIcon /> },
          ].map((item, index) => (
            <ListItem button key={index} className="hover:bg-gray-700 transition duration-300 ease-in-out">
              <ListItemIcon sx={{color: 'white'}}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
