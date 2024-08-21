import React from 'react';
import { Toolbar, Typography, IconButton, Avatar } from '@mui/material';

import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { OnlineStyledBadge } from './OnlineStyledBadge';

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
  const user = useSelector((state: RootState) => state.auth.user);
  return (
      <Toolbar className="flex justify-end space-x-4 m-0" sx={{boxShadow: '0 7px 7px -5px rgba(0, 0, 0, 0.4)'}} >
        <Typography variant="h5" sx={{color: "#00101D" }}>
          {user?.fullName}
        </Typography>
        <IconButton edge="end">
          <OnlineStyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
            <Avatar {...stringAvatar(user?.fullName ?? "")}/>
          </OnlineStyledBadge>
        </IconButton>
      </Toolbar>
  );
};

export default Navbar;
