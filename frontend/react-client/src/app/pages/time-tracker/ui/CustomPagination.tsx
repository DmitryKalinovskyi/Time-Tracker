import React, {useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store.ts';
import {setWorkSessionsPage} from "@time-tracker/features/timeTracking/timeTrackingSlice.ts";


export default function CustomPagination() {
  const {paginationInfo} = useSelector((state: RootState) => state.timeTracker);
  const dispatch = useDispatch();

  const handlePageChange = (_event: React.ChangeEvent<unknown>, nextPage: number) => {
    dispatch(setWorkSessionsPage(nextPage));
  };

  return (
      <Pagination
        showFirstButton
        showLastButton
        count={paginationInfo!.totalPages}
        page={paginationInfo!.currentPage}
        variant="outlined"
        size="large"
        onChange={handlePageChange}
        sx={{
            mb: '1rem',
          "& .MuiPaginationItem-root": {
            color: "#00101D",
            borderColor: "#00101D",
          },
          "& .css-ax94ij-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#00101D",
            color: 'white'
          },
        }}
      />
  );
}
