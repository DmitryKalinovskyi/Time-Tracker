import React from 'react';
import { TableRow, TableCell, Box, Avatar, Typography, Button } from '@mui/material';
import moment from 'moment';
import { WorkSession } from '../../../types/WorkSession';
import { stringAvatar } from '../mainLayout/Navbar';
import { formatDuration } from '../../../misc/TimeFormatter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
interface SessionProps {
  session: WorkSession;
  onEdit: () => void;
  onDelete: (sessionId: number) => void;
}

const Session: React.FC<SessionProps> = ({ session, onEdit, onDelete }) => {

  return (
    <TableRow>
      <TableCell sx={{ width: '10%', fontSize: '0.8rem', textAlign: 'center' }}>
        {moment.utc(session.startTime).local().format("MMM DD, YYYY")}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center' }}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
          <Avatar
            {...stringAvatar(session.user?.fullName ?? "")}
            sx={{
              ...stringAvatar(session.user?.fullName ?? "").sx,
              width: "30px",
              height: "30px",
              fontSize: '0.8rem'
            }}
          />
          <Typography sx={{ color: "#00101D", fontSize: '0.8rem' }}>
            {session.user?.fullName}
          </Typography>
        </Box>
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '0.8rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <AccessTimeIcon sx={{ width: "30px", height: "30px", color: "#00101D" }} />
          <Box>
            {`${moment.utc(session.startTime).local().format("HH:mm")} - ${session.endTime ? moment.utc(session.endTime).local().format("HH:mm") : "Now"}`}
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '0.8rem' }}>
        {session.endTime ? "Finished" : "In Progress"}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '0.8rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <TimerIcon sx={{ width: "30px", height: "30px", color: "#00101D" }} />
          <Box>
            {session.duration ? formatDuration(session.duration) : ""}
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '0.8rem' }}>
        {session.sessionOrigin.originName}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '0.8rem' }}>
        {session.editedBy ?
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
            <Avatar
              {...stringAvatar(session.editedBy?.fullName ?? "")}
              sx={{
                ...stringAvatar(session.editedBy?.fullName ?? "").sx,
                width: "30px",
                height: "30px",
                fontSize: '1.1rem'
              }}
            />
            <Typography sx={{ color: "#00101D", fontSize: '0.8rem' }}>
              {session.editedBy?.fullName}
            </Typography>
          </Box>
          : " "}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '0.8rem' }}>
        {moment.utc(session.lastUpdatedAt).local().format("MMM DD, YYYY HH:mm")}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '0.8rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          { session.endTime && <Button
            sx={{ color: "#00101D" }}
            onClick={onEdit}
          >
            <EditIcon />
          </Button>}
          <Button
            sx={{ color: "#00101D" }}
            onClick={() => onDelete(session.id)}
          >
            <DeleteForeverIcon />
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default Session;
