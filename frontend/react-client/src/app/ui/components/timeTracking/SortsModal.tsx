import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { SortCriteria } from '../../../types/SortCriteria';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import FilterCriteria from '../../../types/FilterCriteria';

interface SortsModalProps
{
  open: boolean,
  onClose: () => void,
  onApplySorts: (sorts: SortCriteria[]) => void
}

const sortsDirections = [
  {name:  "Ascending", isAscending: true},
  {name: "Descending", isAscending: false},
]

const SortsModal = ({
  open,
  onClose,
  onApplySorts,
}: SortsModalProps): JSX.Element => {
  const [startTimeSort, setStartTimeSort] = useState<boolean | null>(false);
  const [durationSort, setDurationSort] = useState<boolean | null>(null);

  
  const handleApply = () => {
    let finalSorts: SortCriteria[] = [];
    if(startTimeSort !== null)
      finalSorts.push({
        sortBy: "START_TIME",
        isAscending: startTimeSort
      })
    if(durationSort !== null)
    {
      finalSorts.push({
        sortBy: "DURATION",
        isAscending: durationSort
      })
    }
    onApplySorts(finalSorts);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          color: '#00101D',
          borderColor: '#00101D',
          borderWidth: 2,
          borderStyle: 'solid',
        },
      }}
    >
      <DialogTitle
        sx={{
          color: '#00101D',
          borderBottom: '1px solid #00101D',
        }}
      >
        Add Sorts
      </DialogTitle>
      
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', border: "1px solid black", m: '1rem', px: '1rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>
              <Typography variant='h6' width={'30%'}>Start Time</Typography>
              <FormControl sx={{ width: '60%' }}>
                <InputLabel id="starttime-direction-label">Direction</InputLabel>
                <Select
                  id="starttime-direction-select"
                  labelId='starttime-direction-label'
                  value={startTimeSort}
                  label="Direction"
                  onChange={(event) => setStartTimeSort(event.target.value as boolean) } >
                  {sortsDirections.map((sort, index) => (
                    <MenuItem key={index} value={sort.isAscending as unknown as string}>
                      {sort.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={() => setStartTimeSort(null)} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>
          </Box>


          <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>
              <Typography variant='h6' width={'30%'}>Duration</Typography>
              <FormControl sx={{ width: '60%' }}>
                <InputLabel id="duration-direction-label">Direction</InputLabel>
                <Select
                  id="duration-direction-select"
                  labelId='duration-direction-label'
                  value={durationSort}
                  label="Direction"
                  onChange={(event) => setDurationSort(event.target.value as boolean) } >
                  {sortsDirections.map((sort, index) => (
                    <MenuItem key={index} value={sort.isAscending as unknown as string}>
                      {sort.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={() => setDurationSort(null)} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>
          </Box>

      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: '#00101D',
            '&:hover': { color: '#003366' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleApply}
          variant="contained"
          sx={{
            backgroundColor: '#00101D',
            '&:hover': {
              backgroundColor: '#003366',
            },
          }}
        >
          Apply
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default SortsModal;
