import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { RootState } from '../../store';
import { getSessions, deleteSession } from '../../features/timeTracking/timeTrackingSlice';
import SessionUpdateForm from './SessionUpdationForm'; // Adjust the import based on your file structure

export const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}h ${minutes}m ${secs}s`;
};

const SessionList: React.FC = () => {
  const dispatch = useDispatch();
  const { workSessions, loading, error } = useSelector((state: RootState) => state.timeTracker);
  const user = useSelector((state: RootState) => state.auth.user);
  const [editingSession, setEditingSession] = useState<any>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getSessions({
      after: null,
      first: 3,
      before: null,
      last: null,
      userId: user && user.id,
      year: null,
      month: null,
      day: null,
    }));
  }, [ dispatch ]);

  const handlePrevPage = () => {
    if (!workSessions.pageInfo.hasPreviousPage) return;
    dispatch(getSessions({ 
      after: null,
      first: null,
      before: workSessions.pageInfo.startCursor,
      last: 3,
      userId: user && user.id,
      year: null,
      month: null,
      day: null,
    }));
  };

  const handleNextPage = () => {
    if (!workSessions.pageInfo.hasNextPage) return;
    dispatch(getSessions({ 
      after: workSessions.pageInfo.endCursor,
      first: 3,
      before: null,
      last: null,
      userId: user && user.id,
      year: null,
      month: null,
      day: null,
    }));
  };

  const handleEdit = (session: any) => {
    setEditingSession(session);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (sessionId: number) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      dispatch(deleteSession(sessionId));
    }
  };

  return (
    <Box>
      {loading && <Typography variant="body1">Loading...</Typography>}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <List>
        {workSessions.edges.map((session) => (
          <React.Fragment key={session.node.id}>
            <ListItem
              secondaryAction={
                <Box>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(session.node)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(session.node.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={`Session ID: ${session.node.id}`}
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Start:</strong> {moment.utc(session.node.startTime).local().format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>End:</strong> {session.node.endTime ? moment.utc(session.node.endTime).local().format('YYYY-MM-DD HH:mm:ss') : 'In Progress'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Duration:</strong> {session.node.duration ? formatDuration(session.node.duration) : 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Origin:</strong> {session.node.sessionOrigin.originName} - {session.node.sessionOrigin.description || 'No description'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>User:</strong> {session.node.user.fullName}
                    </Typography>
                    {session.node.editedBy && (
                      <Typography variant="body2" color="textSecondary">
                        <strong>Edited By:</strong> {session.node.editedBy.fullName}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      <strong>Created At:</strong> {moment.utc(session.node.createdAt).local().format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Last Updated:</strong> {moment.utc(session.node.lastUpdatedAt).local().format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="outlined"
          disabled={!workSessions.pageInfo.hasPreviousPage || loading}
          onClick={handlePrevPage}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          disabled={!workSessions.pageInfo.hasNextPage || loading}
          onClick={handleNextPage}
        >
          Next
        </Button>
      </Box>
      {editingSession && (
        <SessionUpdateForm
          session={editingSession}
          open={updateDialogOpen}
          onClose={() => setUpdateDialogOpen(false)}
        />
      )}
    </Box>
  );
};

export default SessionList;
