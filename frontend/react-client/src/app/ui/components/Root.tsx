import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.tsx";
import Navbar from "../components/Navbar.tsx";
import Sidebar from '../components/Sidebar.tsx';

export default function Root(){
    return (
        <>
          <CssBaseline />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1 }} className="bg-gray-100 min-h-screen">
                <Outlet />
              </Box>
            </Box>
            <Footer />
          </div>
        </>
      );
    };