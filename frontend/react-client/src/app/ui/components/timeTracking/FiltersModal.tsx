import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  Chip,
  MenuItem,
  useTheme,
  Theme,
  TextField,
} from '@mui/material';
import FilterCriteria from '../../../types/FilterCriteria';
import { DateRangePicker } from 'rsuite';
import { addDays, addMonths, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { UserAutoComplete } from '../shared/UserAutoCompolete/UserAutoComplete.tsx';
import User from '../../../types/User';
import { DateRange } from 'rsuite/esm/DateRangePicker';
import useAuth from '../../../hooks/useAuth';

interface FiltersModalProps {
  open: boolean,
  onClose: () => void,
  onApplyFilters: (filters: FilterCriteria[]) => void
}

const predefinedRanges: any = [
  {
    label: 'Last week',
    closeOverlay: false,
    value: () => {
      const start = new Date();
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
      ];
    },
    appearance: 'default',
  },
  {
    label: 'This week',
    closeOverlay: false,
    value: () => {
      const start = new Date();
      return [
        startOfWeek(start, { weekStartsOn: 0 }),
        start,
      ];
    },
    appearance: 'default'
  },
  {
    label: 'Last month',
    closeOverlay: false,
    value: () => {
      const start = new Date();
      return [
        startOfMonth(addMonths(start, -1)),
        endOfMonth(addMonths(start, -1))
      ];
    },
    appearance: 'default'
  },
  {
    label: 'This month',
    closeOverlay: false,
    value: () => {
      const start = new Date();
      return [
        startOfMonth(start),
        start
      ];
    },
    appearance: 'default'
  },
  {
    label: 'Today',
    closeOverlay: false,
    value: () => {
      const start = new Date();
      return [
        start,
        start
      ];
    },
    appearance: 'default'
  },
  {
    label: 'Yesterday',
    closeOverlay: false,
    value: () => {
      const start = new Date();
      return [
        addDays(start, -1),
        addDays(start, -1)
      ];
    },
    appearance: 'default'
  }
];

const origins = [
  { id: "1", name: "Automatic" },
  { id: "2", name: "Manual" },
  { id: "3", name: "Edited" }
];

const durationLengthOperators = [
  {title:  "=", apiTitle: "EQUAL"},
  {title: ">=", apiTitle: "GREATER_THAN_OR_EQUAL"},
  {title: "<=", apiTitle: "LESS_THAN_OR_EQUAL"},
]

function getStyles(id: string , personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(id)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


const FiltersModal = ({
  open,
  onClose,
  onApplyFilters,
}: FiltersModalProps): JSX.Element => {
  const theme = useTheme();
  const [origin, setOrigin] = useState<string[]>([]);
  const [editedBy, setEditedBy] = useState<User | null>(null);
  const [durationOperator, setDurationOperator] = useState<string | null>();
  const [durationValue, setDurationValue] = useState<string | null>();
  const [dateRange, setDateRange] = useState<DateRange | null>(predefinedRanges[4].value());
  const me = useAuth().user!;

  const handleApply = () => {
    let finalFilters: FilterCriteria[] = [];
    if(dateRange)
    {
      let formatedDateRange = "";
      if(dateRange[0].toDateString() == dateRange[1].toDateString())
        formatedDateRange = dateRange[0].toISOString().split('T')[0] + ',' + addDays(dateRange[0], 1).toISOString().split('T')[0]; 
      else
        formatedDateRange = addDays(dateRange[0], 1).toISOString().split('T')[0] + ',' + addDays(dateRange[1], 1).toISOString().split('T')[0]; 
      finalFilters.push(
        {
          filterBy: "START_TIME",
          operator: "BETWEEN",
          value: formatedDateRange
        }
      )
    }
    if(origin.toString())
    {
      finalFilters.push(
        {
          filterBy: "SESSION_ORIGIN_ID",
          operator: "IN",
          value: origin.join(',')
        }
      )
    }
    if(editedBy)
    {
      finalFilters.push(
        {
          filterBy: "EDITED_BY",
          operator: "EQUAL",
          value: editedBy.id.toString()
        }
      )
    }
    if(durationOperator && durationValue)
    {
      finalFilters.push(
        {
          filterBy: "DURATION",
          operator: durationOperator,
          value: durationValue
        }
      )
    }
    finalFilters.push(
      {
          filterBy: "USER_ID",
          operator: "EQUAL",
          value: me.id.toString()
      }
  )
    onApplyFilters(finalFilters);
    onClose();
  };

  const handleOriginChange = (event: SelectChangeEvent<typeof origin>) => {
    const value = event.target.value;
    setOrigin(typeof value === 'string' ? value.split(',') : value,);
  };

  // Clear handlers
  const handleClearDateRange = () => setDateRange(predefinedRanges[4].value());
  const handleClearOrigin = () => setOrigin([]);
  const handleClearEditedBy = () => setEditedBy(null);
  const handleClearDuration = () => {
    setDurationOperator('');
    setDurationValue('');
  };

  return (
    <Dialog 
    open={open} 
    onClose={onClose} 
    fullWidth 
    maxWidth="md"
    PaperProps={{ sx: { color: '#00101D', borderColor: '#00101D', borderWidth: 2, borderStyle: 'solid' } }}>
      <DialogTitle sx={{ color: '#00101D', borderBottom: '1px solid #00101D' }}>
        Add Filters
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', border: "1px solid black", m: '1rem', px: '1rem' }}>
        {/* Date Range Filter */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>
          <Typography variant='h6' width={'30%'}>Date Range</Typography>
          <DateRangePicker 
            ranges={predefinedRanges} 
            value={dateRange}
            format="dd.MM.yyyy" 
            style={{ width: '60%', height: '56px' }}
            placeholder="Select Date Range"
            onOk={(date: [Date, Date]) => setDateRange(date)}
            defaultValue={predefinedRanges[4].value()}
          />
          <Button onClick={handleClearDateRange} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>
        </Box>

        {/* Origin Filter */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>
          <Typography variant='h6' width={'30%'}>Origin</Typography>
          <FormControl sx={{ width: '60%' }}>
            <InputLabel id="multiple-origin-label">Origin</InputLabel>
            <Select
              id="session-origin-select"
              labelId='multiple-origin-label'
              multiple
              value={origin}
              onChange={handleOriginChange}
              input={<OutlinedInput id="origin-chip" label="Origin" />} 
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={origins.find((org) => org.id === value)!.name} />
                  ))}
                </Box>
              )}>
              {origins.map((org) => (
                <MenuItem key={org.id} value={org.id} style={getStyles(org.id, origin, theme)}>
                  {org.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleClearOrigin} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>
        </Box>

        {/* Edited By Filter */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>
          <Typography variant='h6' width={'30%'}>Edited By</Typography>
          <Box width={'60%'}>
            <UserAutoComplete selectedUser={editedBy} onChange={(user) => setEditedBy(user)} />
          </Box>
          <Button onClick={handleClearEditedBy} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>
        </Box>

        {/* Duration Filter */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>
          <Typography variant='h6' width={'30%'}>Duration</Typography>
          <FormControl sx={{ width: '60%', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <InputLabel id="duration-operator-select-label">Operator</InputLabel>
          <Select
            id="duration-operator-select"
            labelId="duration-operator-select-label"
            label="Operator"
            sx={{ width: '35%' }}
            value={durationOperator}
            onChange={(event) => setDurationOperator(event.target.value)}
          >
            <MenuItem aria-label="None" value="" />
            {durationLengthOperators.map((dur) => (
              <MenuItem key={dur.apiTitle} value={dur.apiTitle}>
                {dur.title}
              </MenuItem>
            ))}
          </Select>
            <TextField 
              id="duration-value"
              label="Value" 
              variant='outlined'
              value={durationValue}
              onChange={(event) => setDurationValue(event.target.value)}
              sx={{ width: '65%' }}
            />
          </FormControl>
          <Button onClick={handleClearDuration} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>
        </Box>
        
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#00101D' }}>Cancel</Button>
        <Button onClick={handleApply} variant="contained" sx={{ backgroundColor: '#00101D' }}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltersModal;
