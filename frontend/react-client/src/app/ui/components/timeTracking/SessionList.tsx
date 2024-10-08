import CustomPagination from "./CustomPagination.tsx";
import Box from "@mui/material/Box";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {
  deleteWorkSession,
  getWorkSessions,
  getWorkSessionsSuccessful
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
import Typography from "@mui/material/Typography";
import Session from "./Session.tsx";
import {formatDuration} from "../../../misc/TimeFormatter.ts";
import {useEffect} from "react";

export function SessionList(){
  const dispatch = useDispatch();
  const { workSessions, paginationInfo, loading} = useSelector((state: RootState) => state.timeTracker);

  useEffect(() => {
    dispatch(getWorkSessions({pageNumber: 1}))
  }, [dispatch]);

  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedSession, setSelectedSession] = useState<WorkSession | null>(null);
  // const me = useAuth().user!;

  // useEffect(() => {
  //   dispatch(setFilters([
  //     {
  //       filterBy: "USER_ID",
  //       operator: "EQUAL",
  //       value: me.id.toString()
  //   }
  //   ]));
  // }, [dispatch] )

  // useEffect(() => {
  //   if(filters)
  //     dispatch(getSessions(getCurrentPagArgs(paginationInfo!, sorts, filters)));
  // }, [paginationInfo!.currentPage]);

//   useEffect(() => {
//     if(filters && sorts)
//     {
//       dispatch(setPage(1));
//       dispatch(getSessions(getCurrentPagArgs(paginationInfo!, sorts, filters)));
//     }
//     }, [sorts, filters]);
//
//  useEffect(() => {
//   if(filters && !isTracking){
//     dispatch(setPage(1));
//     dispatch(getSessions(getCurrentPagArgs(paginationInfo!, sorts, filters)));
//     dispatch(getWorkSessionsListingTotalDuration(filters));
//   }
// }, [isTracking]);
//
//   useEffect(() => {
//     if(filters)
//       dispatch(getWorkSessionsListingTotalDuration(filters));
//   }, [filters]);

  // const handleOpenModal = () => {
  //   // setSelectedSession({
  //   //   ...session,
  //   //   startTime: new Date(session.startTime + "Z"),
  //   //   endTime: new Date(session.endTime + "Z")
  //   // });
  //   // setModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  //   setSelectedSession(null);
  //   dispatch(setError(null));
  // };
  //
  // const onUpdateSuccess = () => {
  //   setModalOpen(false);
  //   dispatch(setError(null));
  //   if(filters)
  //     dispatch(getSessions(getCurrentPagArgs(paginationInfo!, sorts, filters)));
  // }
  
  const handleDeleteSession = (sessionId: number) => {
    dispatch(deleteWorkSession(sessionId));
  };

  if ( loading) return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <CircularProgress sx={{ color: '#00101D' }} />
    </Container>
  );

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
            <Box display={'flex'} height={'85%'} flexDirection={'column'} justifyContent={'space-between'}
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
                            onEdit={() => null}
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
          {/*{selectedSession && (*/}
          {/*  <UpdateWorkSessionModal*/}
          {/*    open={modalOpen}*/}
          {/*    onClose={handleCloseModal}*/}
          {/*    initialData={selectedSession}*/}
          {/*    onUpdateSuccess={onUpdateSuccess}*/}
          {/*  />*/}
          {/*)}*/}
        </Box>
      </Fade>
  );
}

