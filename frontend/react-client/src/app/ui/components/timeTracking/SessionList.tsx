import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { deleteSession, getSessions, setPageNumber, updateSession} from '../../../features/timeTracking/timeTrackingSlice';
import {
  Box,
  CircularProgress,
  Container,
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
import CustomPagination from './CustomPagination';
import UpdateWorkSessionModal from '../timeTracking/UpdateWorkSessionModel'; // Adjust the path as needed
import { WorkSession } from '../../../types/WorkSession';

const SessionList: React.FC = () => {
  const dispatch = useDispatch();
  const { isTracking, workSessions, loading, error, filterType, filterValue } = useSelector((state: RootState) => state.timeTracker);
  const user = useSelector((state: RootState) => state.auth.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<WorkSession | null>(null);
  
  const initialPaginationArgs = {
    after: null,
    before: null,
    first: 4,
    last: null,
    userId: user ? user.id : null,
    year: filterValue.year(),
    month: filterType === 'month' || filterType === 'day' ? filterValue.month() + 1 : null,
    day: filterType === 'day' ? filterValue.date() : null,
  };

  useEffect(() => {
    dispatch(getSessions(initialPaginationArgs));
    dispatch(setPageNumber(1));
  }, [isTracking, filterValue, user]);

  const handleOpenModal = (session: WorkSession) => {
    setSelectedSession(session);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSession(null);
  };

  const handleUpdateSession = (updatedSession: WorkSession) => {
    dispatch(updateSession({
      editorId: user?.id as number,
      id: updatedSession.id,
      startTime: updatedSession.startTime,
      endTime: updatedSession.endTime as Date
    }));
    
    handleCloseModal();
  
    // Introduce a delay before fetching sessions
    setTimeout(() => {
      dispatch(getSessions(initialPaginationArgs));
      dispatch(setPageNumber(1));
    }, 300); // Delay in milliseconds, adjust as needed
  };
  
  const handleDeleteSession = (sessionId: number) => {
    dispatch(deleteSession(sessionId));
  
    // Introduce a delay before fetching sessions
    setTimeout(() => {
      dispatch(getSessions(initialPaginationArgs));
      dispatch(setPageNumber(1));
    }, 300); // Delay in milliseconds, adjust as needed
  };

  if (loading) return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <CircularProgress sx={{ color: '#00101D' }} />
    </Container>
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {workSessions.edges.length === 0 ? 
        <Typography variant='h5' color={'#00101D'} height={'100%'} textAlign={'center'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          It looks like there are no work sessions matching your current filters.
        </Typography>
        :
        <>
          <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} px={2} mb={1}>
            <Typography variant='h5' color={"#00101D"} sx={{ opacity: 0.6 }} mr={1}>Total time: </Typography>
            <Typography variant='h4' color={"#00101D"} sx={{ opacity: 1 }}> {formatDuration(12331)}</Typography>
          </Box>
          <Box display={'flex'} height={'90%'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'} px={2}>
            <TableContainer component={Paper} sx={{ borderRadius: '1.5rem', mb: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#00101D", opacity: 0.95 }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>Date</TableCell>
                    <TableCell sx={{ color: "white", width: '12.5%', textAlign: 'center' }}>User</TableCell>
                    <TableCell sx={{ color: "white", width: '15%', textAlign: 'center' }}>TimeRange</TableCell>
                    <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>Status</TableCell>
                    <TableCell sx={{ color: "white", width: '12.5%', textAlign: 'center' }}>Duration</TableCell>
                    <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>Origin</TableCell>
                    <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>EditedBy</TableCell>
                    <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>LastUpdatedAt</TableCell>
                    <TableCell sx={{ color: "white", width: '10%', textAlign: 'center' }}>Actions</TableCell> {/* Added Actions column */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workSessions.edges.map(edge => (
                    <Session
                      key={edge.node.id}
                      session={edge.node}
                      onEdit={() => handleOpenModal(edge.node)}
                      onDelete={() => handleDeleteSession(edge.node.id)} // Pass the function to open the modal
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
          onSave={handleUpdateSession}
          initialData={selectedSession}
        />
      )}
    </>
  );
};

export default SessionList;
