import * as React from 'react';
import { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import {
  BaseSingleInputFieldProps,
  DateValidationError,
  FieldSection,
} from '@mui/x-date-pickers/models';
import { CalendarTodayRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { FilterType } from './FilterSelector';
import { setFilterValue } from '../../../features/timeTracking/timeTrackingSlice';

interface ButtonFieldProps
  extends UseDateFieldProps<Dayjs, false>,
    BaseSingleInputFieldProps<
      Dayjs | null,
      Dayjs,
      FieldSection,
      false,
      DateValidationError
    > {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref } = {},
    inputProps: { 'aria-label': ariaLabel } = {},
  } = props;

  return (
    <Button
      variant="outlined"
      id={id}
      ref={ref}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      sx={{
        width: '10rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        lineHeight: 1,
        color: '#00101D',
        borderColor: "#00101D",
        '&:hover': {
            borderColor: '#003366',
            color: '#003366'
          },
      }}
    >
       <CalendarTodayRounded 
            fontSize='small' 
            sx={{ 
            display: 'inline-flex',
            verticalAlign: 'middle',
            }} 
        />
        <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
            {label ? label : 'Pick a date'}
        </span>
    </Button>
  );
}

function ButtonDatePicker(
  props: Omit<DatePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'>,
) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ ...props.slots, field: ButtonField }}
      slotProps={{ ...props.slotProps, 
        field: { setOpen } as any,
        }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

export default function PickerWithButtonField() {
  const filterValue = useSelector((state: RootState) => state.timeTracker.filterValue);
  const filterType = useSelector((state: RootState) => state.timeTracker.filterType);
  
  const dispatch = useDispatch();
  
  const getDateFormatFromFilter = (filter: FilterType) => {
    switch (filter) {
      case 'day':
        return 'MMM DD, YYYY';
      case 'month':
        return 'MMM YYYY';
      case 'year':
        return 'YYYY';
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ButtonDatePicker
        label={filterValue.format(getDateFormatFromFilter(filterType))}
        value={filterValue}
        onChange={(newValue) => newValue && dispatch(setFilterValue(newValue))}
        views={
            filterType === 'day'
              ? ['year', 'month', 'day']
              : filterType === 'month'
              ? ['year', 'month']
              : ['year']
          }
      />
    </LocalizationProvider>
  );
}