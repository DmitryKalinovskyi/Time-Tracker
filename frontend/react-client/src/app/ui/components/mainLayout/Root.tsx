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
              sx={{ minHeight: '100vh', display: 'flex', width: '100vw' }}
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
                            overflow: 'hidden',
                              borderRadius: '1.5rem'
                            }}>
                      <Stack sx={{flex: 1}}>
                          <Navbar />
                          <Outlet/>
                      </Stack>
                      {/*<div className="flex flex-col flex-grow">*/}
                      {/*    <Navbar/>*/}
                      {/*    <div className="flex flex-grow">*/}
                      {/*        <Outlet className="flex-grow"/>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
                    {/*<Stack sx={{flex: 1}} m={0}>*/}
                        {/*<Outlet sx={{flexGrow: 1, overflow: 'auto' }}/>*/}
                    {/*</Stack>*/}
                  </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
      );
    };