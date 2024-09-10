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
} from '@mui/material';
import { SQLOperators } from '../../../enums/SQLOperators'; // Keep the SQL operators enum common for all
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import FilterCriteria from '../../../types/FilterCriteria';


interface FiltersPickerModalProps<T> {
  open: boolean;
  filtersEnum: T[];                     // This represents the available filters as an enum
  onClose: () => void;
  onApplyFilters: (filters: FilterCriteria<T, SQLOperators>[]) => void;
}

const FiltersPickerModal = <T extends string>({
  open,
  filtersEnum,
  onClose,
  onApplyFilters,
}: FiltersPickerModalProps<T>): JSX.Element => {
  const [filters, setFilters] = React.useState<FilterCriteria<T, SQLOperators>[]>([
    { filterBy: filtersEnum[0], operator: SQLOperators.Equal, value: '' },
  ]);

  // Handle filter field change
  const handleFilterChange = (index: number, key: keyof FilterCriteria<T, SQLOperators>, value: string | T | SQLOperators) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], [key]: value };
    setFilters(updatedFilters);
  };

  // Add a new filter row
  const handleAddFilter = () => {
    setFilters([...filters, { filterBy: filtersEnum[0], operator: SQLOperators.Equal, value: '' }]);
  };

  // Remove an existing filter row
  const handleRemoveFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  // Apply the filters and close the modal
  const handleApply = () => {
    onApplyFilters(filters);
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
        Pick Filters
      </DialogTitle>
      
      <DialogContent>
        {filters.map((filter, index) => (
          <div key={index} style={{  marginTop: '1rem', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <TextField
              select
              label="Filter"
              value={filter.filterBy}
              onChange={(e) => handleFilterChange(index, 'filterBy', e.target.value as T)}
              sx={{ marginRight: '16px', width: '30%' }}
            >
              {filtersEnum.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Operator"
              value={filter.operator}
              onChange={(e) => handleFilterChange(index, 'operator', e.target.value as SQLOperators)}
              sx={{ marginRight: '16px', width: '20%' }}
            >
              {Object.values(SQLOperators).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Value"
              value={filter.value}
              onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
              sx={{ marginRight: '16px', width: '40%' }}
            />

            {filters.length > 1 && (
              <IconButton onClick={() => handleRemoveFilter(index)}>
                <DeleteIcon sx={{ color: '#00101D', '&:hover': { color: '#003366' } }} />
              </IconButton>
            )}
          </div>
        ))}

        <Button
          variant="outlined"
          onClick={handleAddFilter}
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

export default FiltersPickerModal;
