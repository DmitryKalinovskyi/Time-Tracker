import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box className="bg-blue-800 text-white p-4 flex flex-col items-center mt-auto">
      <Typography variant="body1">
        © {new Date().getFullYear()} Time Tracker. All rights reserved.
      </Typography>
      <div className="flex space-x-4 mt-2">
        <Link href="#" color="inherit" className="hover:underline">
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" className="hover:underline">
          Terms of Service
        </Link>
      </div>
    </Box>
  );
};

export default Footer;
