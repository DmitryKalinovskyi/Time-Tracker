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
import { useDispatch } from 'react-redux';
import { deleteSession } from '../../../features/timeTracking/timeTrackingSlice';

interface SessionProps {
  session: WorkSession;
}


const Session: React.FC<SessionProps> = ({ session }) => {

  const dispatch = useDispatch();

  const handleDeleteSession = (sessionId: number) => {
    dispatch(deleteSession(sessionId));
    console.log(`Session with id = ${sessionId} has been deleted. `)
  }
  
  return (
    <TableRow>
      <TableCell sx={{ width: '10%',  fontSize: '1.1rem', textAlign: 'center' }}>{moment.utc(session.createdAt).local().format("MMM DD, YYYY \n HH:mm")}</TableCell>
      <TableCell sx={{ width: '12.5%', textAlign: 'center' }}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
        <Avatar
            {...stringAvatar(session.user?.fullName ?? "")}
            sx={{
              ...stringAvatar(session.user?.fullName ?? "").sx,
              width: "30px",
              height: "30px",
              fontSize: '1.1rem'
            }}
          />
        <Typography  sx={{color: "#00101D", fontSize: '1.1rem'}}>
          {session.user?.fullName}
        </Typography>
        </Box>
      </TableCell>

      <TableCell sx={{ width: '15%', textAlign: 'center', fontSize: '1.1rem'}}>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2}}>
          <AccessTimeIcon sx={{width:"30px", height:"30px", color: "#00101D"}} />
          <Box >
            {`${moment.utc(session.startTime).local().format("HH:mm")} - ${session.endTime ? moment.utc(session.endTime).local().format("HH:mm") : "Now"}`}
          </Box>
        </Box>
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1.1rem' }}>{session.endTime ? "Finished" : "In Progress"}</TableCell>
      <TableCell sx={{ width: '12.5%', textAlign: 'center', fontSize: '1.1rem' }}>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2}}>
            <TimerIcon sx={{width:"30px", height:"30px", color: "#00101D" }}/>
            <Box>
              {session.duration ? formatDuration(session.duration) : ""}
            </Box>
        </Box>
        </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1.1rem' }}>{session.sessionOrigin.originName}</TableCell>
      <TableCell sx={{ width: '12.5%', textAlign: 'center', fontSize: '1.1rem' }}>
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
        <Typography  sx={{color: "#00101D", fontSize: '1.1rem'}}>
          {session.editedBy?.fullName}
        </Typography>
        </Box> : " " }
      </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1.1rem' }}>{moment.utc(session.lastUpdatedAt).local().format("MMM DD, YYYY HH:mm")}</TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1.1rem' }}>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Button 
          sx={{color: "#00101D"}} 
          onClick={() => console.log(session.id)} 
        >
          <EditIcon />
        </Button>
        <Button 
          sx={{color: "#00101D"}} 
          onClick={() => handleDeleteSession(session.id)}
        >
          <DeleteForeverIcon />
        </Button>
        </Box>
        
      </TableCell>      


    </TableRow>
  );
};

export default Session;
