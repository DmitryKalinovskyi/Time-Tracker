import React from 'react';
import { TableRow, TableCell, Box, Avatar, Typography, Button } from '@mui/material';
import moment from 'moment';
import { WorkSession } from '../../../types/WorkSession';
import { formatDuration } from '../../../misc/TimeFormatter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {stringAvatar} from "../../../misc/StringHelper.ts";
interface SessionProps {
  session: WorkSession;
  onEdit: () => void;
  onDelete: (sessionId: number) => void;
}

const Session: React.FC<SessionProps> = ({ session, onEdit, onDelete }) => {

  return (
    <TableRow>
      <TableCell sx={{ width: '10%', fontSize: '1rem', textAlign: 'center' }}>
        {moment.utc(session.startTime).local().format("MMM DD, YYYY")}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center' }}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
          <Typography sx={{ color: "#00101D", fontSize: '1rem' }}>
            {session.user?.fullName}
          </Typography>
            <Avatar
                {...stringAvatar(session.user?.fullName ?? "")}
                sx={{
                    ...stringAvatar(session.user?.fullName ?? "").sx,
                    width: "30px",
                    height: "30px",
                    fontSize: '1rem'
                }}
            />
        </Box>
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box>
            {`${moment.utc(session.startTime).local().format("HH:mm")} - ${session.endTime ? moment.utc(session.endTime).local().format("HH:mm") : "Now"}`}
          </Box>
          <AccessTimeIcon sx={{ width: "30px", height: "30px", color: "#00101D" }} />
        </Box>
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1rem' }}>
        {session.endTime ? "Finished" : "In Progress"}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box>
            {session.duration ? formatDuration(session.duration) : ""}
          </Box>
          <TimerIcon sx={{ width: "30px", height: "30px", color: "#00101D" }} />
        </Box>
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1rem' }}>
        {session.sessionOrigin.originName}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1rem' }}>
        {session.editedBy ?
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
            <Typography sx={{ color: "#00101D", fontSize: '1rem' }}>
              {session.editedBy?.fullName}
            </Typography>
              <Avatar
                  {...stringAvatar(session.editedBy?.fullName ?? "")}
                  sx={{
                      ...stringAvatar(session.editedBy?.fullName ?? "").sx,
                      width: "30px",
                      height: "30px",
                      fontSize: '1.1rem'
                  }}
              />
          </Box>
          : " "}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1rem' }}>
        {moment.utc(session.lastUpdatedAt).local().format("MMM DD, YYYY HH:mm")}
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1rem' }}>
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
