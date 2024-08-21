import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store'; // Adjust the path according to your store setup
import { getSessions } from '../../../features/timeTracking/timeTrackingSlice'; // Adjust according to your actions setup
import {
  CircularProgress,
  Container,
} from '@mui/material';

const SessionList: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.timeTracker);
  
  useEffect(() => {
    dispatch(getSessions({
      after: null,
      before: null,
      first: 3,
      last: null,
      userId: 123,
      year: null,
      month: null,
      day: null,
    }));
  }, [dispatch]);

  if (loading) return <Container 
                      sx={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '58%'}}>
                            <CircularProgress sx={{color: '#00101D'}} />
                        </Container>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    </>
  );
};

export default SessionList;
