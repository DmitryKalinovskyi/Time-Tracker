import React from 'react';
import Pagination from '@mui/material/Pagination';
import { getSessions, PaginationPayload, setPageNumber } from '../../../features/timeTracking/timeTrackingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';

const ITEMSPERPAGE = 4;

const CustomPagination: React.FC= ({
}) => {
  const {workSessions, filterType, filterValue, pageNumber} = useSelector((state: RootState) => state.timeTracker);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  
  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPageNumber: number) => {
    console.log(`Current Page: ${pageNumber}, New Page: ${newPageNumber}`);

    const direction = newPageNumber > pageNumber ? 'next' : 'previous';

    dispatch(setPageNumber(newPageNumber));

    const paginationArgs: PaginationPayload = {
      after: direction === 'next' ? workSessions.pageInfo.endCursor : null,
      before: direction === 'previous' ? workSessions.pageInfo.startCursor : null,
      first: direction === 'next' ? ITEMSPERPAGE : null,
      last: direction === 'previous' ? ITEMSPERPAGE : null,
      userId: user ? user.id : null,
      year: filterValue.year(),
      month: filterType === 'month' || filterType === 'day' ? filterValue.month() + 1 : null,
      day: filterType === 'day' ? filterValue.date() : null,
    };

    console.log("Dispatching with paginationArgs:", paginationArgs);

    dispatch(getSessions(paginationArgs));
  };

  const pageCount = Math.ceil(workSessions.totalCount / ITEMSPERPAGE);

  return (
      <Pagination
        count={pageCount}
        page={pageNumber}
        variant="outlined"
        size="large"
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#00101D",
            borderColor: "#00101D",
          },
          "& .MuiPaginationItem-page": {
            pointerEvents: 'none',
          },
          "& .MuiPaginationItem-previousNext": {
            pointerEvents: 'auto',
          },
          "& .css-ax94ij-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#00101D",
            color: 'white'
          },
        }}
      />
  );
};

export default CustomPagination;
