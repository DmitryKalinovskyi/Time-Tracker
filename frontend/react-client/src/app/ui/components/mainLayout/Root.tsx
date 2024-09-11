import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import {Stack} from "@mui/material";

export default function Root(){
    return (
        <>
          <Box 
              sx={{ minHeight: '100vh', 
                display: 'flex', 
              }}
              p={2}
              bgcolor={"#DEDEDE"}
              >
            <Grid container 
                  spacing={3} 
                  bgcolor={'#FAFAFA'}
                  borderRadius={'1.7rem'}
                  m={0}
                  width={'100%'}
                  flexGrow={1}
                  >
              <Grid lg={2.5} md={6} sm={12} m={0}>
                <Paper elevation={3} sx={{height: '100%', borderRadius: '1.5rem'}} >
                    <Sidebar />
                </Paper>
              </Grid>
              <Grid lg={9.5} md={6} sm={12} sx={{ display: 'flex', justifyContent: 'stretch'}}>
                  <Paper 
                        elevation={3} 
                        sx={{ 
                              flex: 1, 
                              display: 'flex', 
                              flexDirection: 'column',
                              borderRadius: '1.5rem'
                            }}>
                      <Stack sx={{flex: 1}}>
                          <Navbar />
                          <Outlet/>
                      </Stack>
                  </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    };