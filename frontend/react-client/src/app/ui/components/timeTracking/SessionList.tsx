import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { deleteSession, getSessions, getWorkSessionsListingTotalDuration, setError, setFilters, setPage, updateSession, WorkSessionPaginationRequest} from '../../../features/timeTracking/timeTrackingSlice';
import {
  Box,
  CircularProgress,
  Container,
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { formatDuration } from '../../../misc/TimeFormatter';
import Session from './Session';
import UpdateWorkSessionModal from './UpdateWorkSessionModal';
import { WorkSession } from '../../../types/WorkSession';
import CustomPagination from './CustomPagination';
import useAuth from '../../../hooks/useAuth';
import { isTodayStartTimeFilter } from '../../../misc/FiltersHelper';

const SessionList: React.FC = () => {
  const dispatch = useDispatch();
  const { isTracking, workSessions, filters, paginationInfo, sorts, loading, error, workSessionsListingTotalDuration } = useSelector((state: RootState) => state.timeTracker);
  const user = useSelector((state: RootState) => state.auth.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<WorkSession | null>(null);
  const me = useAuth().user!;

  useEffect(() => {
    dispatch(setFilters([
      {
        filterBy: "USER_ID",
        operator: "EQUAL",
        value: me.id.toString()
    }
    ]));
  }, [dispatch] )

  useEffect(() => {
    const PaginationArgs: WorkSessionPaginationRequest = {
      pageNumber: paginationInfo!.currentPage,
      pageSize: paginationInfo!.pageSize,
      sortCriterias: sorts,
      filterCriterias: filters
    };
    if(filters)
      dispatch(getSessions(PaginationArgs));
  }, [paginationInfo!.currentPage, sorts, filters, isTracking]);
  
  useEffect(() => {
    if(filters)
      dispatch(getWorkSessionsListingTotalDuration(filters));
  }, [filters, isTracking]);

  const handleOpenModal = (session: WorkSession) => {
    setSelectedSession({
      ...session,
      startTime: new Date(session.startTime + "Z"),
      endTime: new Date(session.endTime + "Z")
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSession(null);
    dispatch(setError(null));
  };
  
  const handleDeleteSession = (sessionId: number) => {
    dispatch(deleteSession(sessionId));
    dispatch(setPage(1));
  };

  if (loading && !modalOpen) return (
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

  if (error && !modalOpen) return <div>Error: {error}</div>;

  return (
    <Fade in={!loading} timeout={500}>
  <Box sx={{height: '100%'}}>
    {workSessions.length == 0 && (filters && !isTodayStartTimeFilter(filters)) ? 
      <Typography variant='h5' color={'#00101D'} height={'100%'} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        It looks like there are no work sessions matching your current filters.
      </Typography>
      : workSessions.length == 0 && (!filters || isTodayStartTimeFilter(filters)) ?
      <Typography variant='h5' color={'#00101D'} height={'100%'} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      It looks like you haven't started any work sessions today.
      </Typography>
       :
      <>
        <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} px={2}>
          <Typography variant='h5' color={"#00101D"} sx={{ opacity: 0.6 }} mr={1}>Total time: </Typography>
          <Typography variant='h4' color={"#00101D"} sx={{ opacity: 1 }}> {formatDuration(workSessionsListingTotalDuration)}</Typography>
        </Box>
        <Box display={'flex'} height={'85%'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'} px={2}>
          <TableContainer component={Paper} sx={{ borderRadius: '1.5rem', mb: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#00101D", opacity: 0.95 }}>
                <TableRow>
                  <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>Date</TableCell>
                  <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>User</TableCell>
                  <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>TimeRange</TableCell>
                  <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>Status</TableCell>
                  <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>Duration</TableCell>
                  <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>Origin</TableCell>
                  <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>EditedBy</TableCell>
                  <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>LastUpdatedAt</TableCell>
                  <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>Actions</TableCell>
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

          <Box sx={{ justifySelf: 'flex-end' }}>
            <CustomPagination />
          </Box>
        </Box>
      </>
    }
    {selectedSession && (
      <UpdateWorkSessionModal
        open={modalOpen}
        onClose={handleCloseModal}
        initialData={selectedSession}
      />
    )}
  </Box>
</Fade>

    
  );
};

export default SessionList;
