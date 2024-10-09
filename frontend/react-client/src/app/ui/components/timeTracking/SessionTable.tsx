import CustomPagination from "./CustomPagination.tsx";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {
  deleteWorkSession,
  getWorkSessions,
} from "../../../features/timeTracking/timeTrackingSlice.ts";
import {
  CircularProgress,
  Container,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Session from "./Session.tsx";
import {useEffect, useState} from "react";
import {WorkSession} from "../../../types/WorkSession.ts";
import UpdateWorkSessionModal from "./UpdateWorkSessionModal.tsx";

export function SessionTable(){
  const dispatch = useDispatch();
  const { workSessions, loading} = useSelector((state: RootState) => state.timeTracker);

  useEffect(() => {
    dispatch(getWorkSessions())
  }, [dispatch]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<WorkSession | null>(null);

  const handleOpenModal = (workSession: WorkSession) => {
    setSelectedSession({
      ...workSession
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };


  const handleDeleteSession = (sessionId: number) => {
    dispatch(deleteWorkSession(sessionId));
  };

  // if ( loading) return (
  //   <Container
  //     sx={{
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       height: '100%',
  //     }}
  //   >
  //     <CircularProgress sx={{ color: '#00101D' }} />
  //   </Container>
  // );
  if(workSessions.length == 0) return null;

  return (
      <Fade in={!loading} timeout={500}>
        <Box sx={{height: '100%'}}>
          {/*{workSessions.length == 0 && (filters && !isTodayStartTimeFilter(filters)) ? */}
          {/*  <Typography variant='h5' color={'#00101D'} height={'100%'} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'}>*/}
          {/*    It looks like there are no work sessions matching your current filters.*/}
          {/*  </Typography>*/}
          {/*  : workSessions.length == 0 && (!filters || isTodayStartTimeFilter(filters)) ?*/}
          {/*  <Typography variant='h5' color={'#00101D'} height={'100%'} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'}>*/}
          {/*  It looks like you haven't finished any work sessions today.*/}
          {/*  </Typography>*/}
          {/*   :*/}
          <>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}
                 alignItems={'center'} px={2}>
              <TableContainer component={Paper} sx={{borderRadius: '1.5rem', mb: 2}}>
                <Table>
                  <TableHead sx={{backgroundColor: "#00101D", opacity: 0.95}}>
                    <TableRow>
                      <TableCell sx={{color: "white", width: '10%', textAlign: 'center'}}>Date</TableCell>
                      <TableCell sx={{color: "white", width: '10%', textAlign: 'center'}}>User</TableCell>
                      <TableCell sx={{color: "white", width: '10%', textAlign: 'center'}}>Time Range</TableCell>
                      <TableCell sx={{color: "white", width: '10%', textAlign: 'center'}}>Status</TableCell>
                      <TableCell sx={{color: "white", width: '10%', textAlign: 'center'}}>Duration</TableCell>
                      <TableCell sx={{color: "white", width: '10%', textAlign: 'center'}}>Origin</TableCell>
                      <TableCell sx={{color: "white", width: '10%', textAlign: 'center'}}>Edited By</TableCell>
                      <TableCell sx={{color: "white", width: '10%', textAlign: 'center'}}>Last Updated At</TableCell>
                      <TableCell sx={{color: "white", width: '10%', textAlign: 'center'}}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workSessions.map(session => (
                        <Session
                            key={session.id}
                            session={session}
                            onEdit={() => handleOpenModal(session)}
                            onDelete={() => handleDeleteSession(session.id)}
                        />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{justifySelf: 'flex-end'}}>
                <CustomPagination/>
              </Box>
            </Box>
          </>
          {selectedSession && (
            <UpdateWorkSessionModal
              open={isEditModalOpen}
              onClose={handleCloseModal}
              initialData={selectedSession}
            />
          )}
        </Box>
      </Fade>
  );
}

