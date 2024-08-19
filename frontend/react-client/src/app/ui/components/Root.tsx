import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Root(){
    return (
        <>
          <Box 
              sx={{ minHeight: '100vh', display: 'flex', minWidth: '99vw' }}
              p={'1rem'}
              bgcolor={"#DEDEDE"}
              >
            <Grid container 
                  spacing={3} 
                  width={'100%'} 
                  bgcolor={'#FAFAFA'}
                  borderRadius={'1.7rem'}
                  m={0}
                  flexGrow={1}
                  >
              <Grid lg={2} m={0}>
                <Paper elevation={3} sx={{height: '100%', borderRadius: '1.5rem'}} >
                    <Sidebar />
                </Paper>
              </Grid>
              <Grid lg={10} sx={{ display: 'flex', justifyContent: 'stretch'}}>
                  <Paper 
                        elevation={3} 
                        sx={{ 
                              flex: 1, 
                              display: 'flex', 
                              flexDirection: 'column', 
                              borderRadius: '1.5rem'
                            }}>

                    <Grid container spacing={3} sx={{flex: 1}} m={0}>
                      <Grid lg={12} xs={12} p={0}>
                        <Navbar />
                      </Grid>
                      <Grid lg={12} xs={12} sx={{flex: 1}} m={0}>
                        <Outlet />
                      </Grid>
                    </Grid>
                  </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    };