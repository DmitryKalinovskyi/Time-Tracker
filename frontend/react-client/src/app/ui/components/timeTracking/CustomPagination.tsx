import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


interface CustomPaginationProps {
  totalCount: number;
  itemsPerPage: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalCount,
  itemsPerPage,
}) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={pageCount}
        page={page}
        variant="outlined"
        size="large"
        onChange={(_event, number) => setPage(number)}
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
          "& .Mui-selected": {
            backgroundColor: "#00101D",
            color: 'white'
          },
        }}
      />
    </Stack>
  );
};

export default CustomPagination;
