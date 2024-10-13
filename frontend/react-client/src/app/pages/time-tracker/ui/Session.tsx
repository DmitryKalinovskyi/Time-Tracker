import React from 'react';
import { TableRow, TableCell, Box, Avatar, Typography, Button } from '@mui/material';
import moment from 'moment';
import { WorkSession } from '@time-tracker/types/WorkSession.ts';
import { formatDuration } from '@time-tracker/shared/misc/TimeFormatter.ts';
import TimerIcon from '@mui/icons-material/Timer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {stringAvatar} from "@time-tracker/shared/misc/StringHelper.ts";
import useIsHavePermission from "@time-tracker/features/authentification/hooks/useIsHavePermission.ts";
import {ManageUsersSessionsPermission} from "@time-tracker/features/permissions/permissions.ts";
import {useIsMe} from "@time-tracker/features/authentification/hooks/useIsMe.ts";
import dayjs from "dayjs";
interface SessionProps {
  session: WorkSession;
  onEdit: () => void;
  onDelete: (sessionId: number) => void;
}

const Session: React.FC<SessionProps> = ({ session, onEdit, onDelete }) => {
    const isCanManageUsersSessions = useIsHavePermission(ManageUsersSessionsPermission);
    const isMySession = useIsMe(session.user);
  return (
    <TableRow>
      <TableCell sx={{ width: '10%', fontSize: '1rem', textAlign: 'center' }}>
        {dayjs(session.startTime).format("DD.MM.YYYY HH:mm:ss")}
      </TableCell>
        <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1rem' }}>
            {session.endTime && dayjs(session.endTime).format("DD.MM.YYYY HH:mm:ss")}
        </TableCell>
      <TableCell sx={{ width: '10%', textAlign: 'center', fontSize: '1rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box>
            {session.duration ? formatDuration(session.duration) : ""}
          </Box>
          <TimerIcon sx={{ width: "30px", height: "30px", color: "#00101D" }} />
        </Box>
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
            {session.endTime ? "Finished" : "In Progress"}
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

          {(isCanManageUsersSessions || isMySession) && session.endTime && <>
              <Button sx={{ color: "#00101D" }} onClick={onEdit}>
                <EditIcon />
              </Button>
              <Button color="error" onClick={() => onDelete(session.id)}>
                <DeleteForeverIcon />
              </Button>
          </>}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default Session;
