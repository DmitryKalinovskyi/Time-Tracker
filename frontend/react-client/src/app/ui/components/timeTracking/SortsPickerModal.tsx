import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  IconButton,
  FormControlLabel,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { SortCriteria } from '../../../types/SortCriteria';

interface SortsPickerModalProps<T> {
  open: boolean;
  sortsEnum: T[];                     // This represents the available sorts as an enum
  onClose: () => void;
  onApplySorts: (sorts: SortCriteria<T>[]) => void;
}

const SortsPickerModal = <T extends string>({
  open,
  sortsEnum,
  onClose,
  onApplySorts,
}: SortsPickerModalProps<T>): JSX.Element => {
  const [sorts, setSorts] = React.useState<SortCriteria<T>[]>(
    [
        {sortBy: sortsEnum[0], isAscending: false},
    ]
  );

  const handleSortChange = (index: number, key: keyof SortCriteria<T>, value: T | boolean) => {
    const updatedSorts = [...sorts];
    updatedSorts[index] = { ...updatedSorts[index], [key]: value };
    setSorts(updatedSorts);
  };

  // Add a new filter row
  const handleAddSort = () => {
    setSorts([...sorts, { sortBy: sortsEnum[0], isAscending: false }]);
  };

  const handleRemoveSort = (index: number) => {
    const updatedSorts = sorts.filter((_, i) => i !== index);
    setSorts(updatedSorts);
  };

  const handleApply = () => {
    onApplySorts(sorts);
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
        Pick Sorts
      </DialogTitle>
      
      <DialogContent>
        {sorts.map((sort, index) => (
          <div key={index} style={{  marginTop: '1rem', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <TextField
              select
              label="SortBy"
              value={sort.sortBy}
              onChange={(e) => handleSortChange(index, 'sortBy', e.target.value as T)}
              sx={{ marginRight: '16px', width: '30%' }}
            >
              {sortsEnum.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <FormControlLabel
              control={
                <Checkbox
                  checked={sort.isAscending}
                  onChange={(e) => handleSortChange(index, 'isAscending', e.target.checked as boolean)}
                  sx={{ marginLeft: '1rem', width: '20%', 
                    '&.Mui-checked': {
                      color: '#00101D',
                    } 
                  }}
                />
              }
              label={sort.isAscending ? 'Ascending' : 'Descending'}
            />

            {sorts.length > 1 && (
              <IconButton onClick={() => handleRemoveSort(index)}>
                <DeleteIcon sx={{ color: '#00101D', '&:hover': { color: '#003366' } }} />
              </IconButton>
            )}
          </div>
        ))}

        <Button
          variant="outlined"
          onClick={handleAddSort}
          startIcon={<AddIcon />}
          sx={{
            marginTop: '16px',
            color: '#00101D',
            borderColor: '#00101D',
            '&:hover': {
              borderColor: '#003366',
              color: '#003366',
            },
          }}
        >
          Add Filter
        </Button>

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

export default SortsPickerModal;
