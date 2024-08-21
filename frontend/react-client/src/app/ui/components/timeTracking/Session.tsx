import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import moment from 'moment';
import { WorkSession } from '../../../types/WorkSession';

interface SessionProps {
  session: WorkSession;
}

const Session: React.FC<SessionProps> = ({ session }) => {
  return (
    <TableRow>
      <TableCell>{session.id}</TableCell>
      <TableCell>{moment(session.startTime).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
      <TableCell>{session.endTime ? moment(session.endTime).format('YYYY-MM-DD HH:mm:ss') : 'Ongoing'}</TableCell>
      <TableCell>{session.duration ? `${session.duration} seconds` : 'N/A'}</TableCell>
      <TableCell>{session.user.fullName}</TableCell>
      <TableCell>{session.sessionOrigin.originName}</TableCell>
    </TableRow>
  );
};

export default Session;
