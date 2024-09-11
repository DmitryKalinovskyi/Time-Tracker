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
import { WorkSessionFilters } from '../../../enums/WorkSessionFilters';
import { WorkSessionOrigin } from '../../../enums/WorkSessionOrigin';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface FiltersPickerModalProps<T> {
  open: boolean;
  filtersEnum: T[];
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

  const handleFilterChange = (index: number, key: keyof FilterCriteria<T, SQLOperators>, value: string | T | SQLOperators) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = { ...updatedFilters[index], [key]: value };
    setFilters(updatedFilters);
  };

  const handleAddFilter = () => {
    setFilters([...filters, { filterBy: filtersEnum[0], operator: SQLOperators.Equal, value: '' }]);
  };

  const handleRemoveFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  // Render different input fields based on filter type
  const renderInputField = (filter: FilterCriteria<T, SQLOperators>, index: number) => {
    switch (filter.filterBy) {
      case WorkSessionFilters.Year:
      case WorkSessionFilters.Month:
      case WorkSessionFilters.Week:
      case WorkSessionFilters.Day:
        return (
          <DatePicker
            label={filter.filterBy}
            views={getPickerViews(filter.filterBy as WorkSessionFilters)} 
            value={filter.value}
            onChange={(newValue) => handleFilterChange(index, 'value', newValue ? newValue.format('YYYY-MM-DD') : '')}
            renderInput={(params: any) => <TextField {...params} sx={{ width: '40%' }} />}
          />
        );

      case WorkSessionFilters.SessionOrigin:
        return (
          <TextField
            select
            label="Session Origin"
            value={filter.value}
            onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
            sx={{ width: '40%' }}
          >
            {Object.values(WorkSessionOrigin).map((option) => (
              <MenuItem key={option} value={option}>
                {option === WorkSessionOrigin.Automatic ? 'Automatic' : option === WorkSessionOrigin.Manual ? 'Manual' : 'Edited'}
              </MenuItem>
            ))}
          </TextField>
        );

      default:
        return (
          <TextField
            label="Value"
            value={filter.value}
            onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
            sx={{ width: '40%' }}
          />
        );
    }
  };

  const getPickerViews = (filter: WorkSessionFilters) => {
    switch (filter) {
      case WorkSessionFilters.Year:
        return ['year'];
      case WorkSessionFilters.Month:
        return ['year', 'month'];
      case WorkSessionFilters.Week:
      case WorkSessionFilters.Day:
        return ['year', 'month', 'day'];
      default:
        return ['day'];
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Pick Filters</DialogTitle>

      <DialogContent>
        {filters.map((filter, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
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

            {/* Render the appropriate input field */}
            {renderInputField(filter, index)}

            {filters.length > 1 && (
              <IconButton onClick={() => handleRemoveFilter(index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}

        <Button
          variant="outlined"
          onClick={handleAddFilter}
          startIcon={<AddIcon />}
          sx={{ marginTop: '16px' }}
        >
          Add Filter
        </Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltersPickerModal;
