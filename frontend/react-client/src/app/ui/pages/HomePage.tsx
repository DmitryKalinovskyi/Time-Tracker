import useIsAuthenticated from "../../hooks/useIsAuthenticated.ts";
import {Navigate} from "react-router-dom";
import Sidebar from '../components/Sidebar.tsx';
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import TimeTracker from "../components/TimeTracker.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

export default function HomePage(){
    return (
        <>
          <CssBaseline />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="bg-gray-100 min-h-screen">
                <Toolbar />
                <Typography variant="h4" className="text-blue-800" sx={{mb: 4}}>
                  Welcome to Time Tracker
                </Typography>
                <TimeTracker />
              </Box>
            </Box>
            <Footer />
          </div>
        </>
      );
    };