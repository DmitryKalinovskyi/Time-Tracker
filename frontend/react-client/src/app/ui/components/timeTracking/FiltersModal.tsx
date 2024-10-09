import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Theme, MenuItem, useTheme, FormControl, InputLabel, Select, OutlinedInput, Chip,
} from '@mui/material';
import { addDays, addMonths, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { UserAutoComplete } from '../shared/UserAutoCompolete/UserAutoComplete.tsx';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {
  applyTimeTrackerFilter,
  getWorkSessions,
  TimeTrackerFilter
} from "../../../features/timeTracking/timeTrackingSlice.ts";

interface FiltersModalProps {
  open: boolean,
  onClose: () => void,
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

function getStyles(id: string , personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(id)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


export default function FiltersModal({open, onClose}: FiltersModalProps){
  const theme = useTheme();
  const {selectedUser, selectedOrigins} = useSelector((state: RootState) => state.timeTracker.filter);
  const [filter, setFilter] = useState<TimeTrackerFilter>({
    selectedUser: (selectedUser? {...selectedUser}: null),
    selectedOrigins
  });
  const dispatch = useDispatch();
  const handleClose = () => {
    setFilter({
      selectedUser: (selectedUser? {...selectedUser}: null),
      selectedOrigins
    });
    onClose();
  }
  const handleApply = () => {
    dispatch(applyTimeTrackerFilter(filter));
    onClose();
  }

  return (
    <Dialog 
    open={open} 
    onClose={handleClose}
    fullWidth 
    maxWidth="md"
    PaperProps={{ sx: { color: '#00101D', borderStyle: 'solid' } }}>
      <DialogTitle sx={{ color: '#00101D' }}>
        Add Filters
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', m: '1rem', px: '1rem' }}>
        {/* Date Range Filter */}
        {/*<Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>*/}
        {/*  <Typography variant='h6' width={'30%'}>Date Range</Typography>*/}
        {/*  <DateRangePicker */}
        {/*    ranges={predefinedRanges} */}
        {/*    value={dateRange}*/}
        {/*    format="dd.MM.yyyy" */}
        {/*    style={{ width: '60%', height: '56px' }}*/}
        {/*    placeholder="Select Date Range"*/}
        {/*    onOk={(date: [Date, Date]) => setDateRange(date)}*/}
        {/*    defaultValue={predefinedRanges[4].value()}*/}
        {/*  />*/}
        {/*  <Button onClick={handleClearDateRange} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>*/}
        {/*</Box>*/}

        {/* Origin Filter */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>
          <Typography variant='h6' width={'30%'}>Origin</Typography>
          <FormControl sx={{ width: '60%' }}>
            <InputLabel id="multiple-origin-label">Origin</InputLabel>
            <Select
              id="session-origin-select"
              labelId='multiple-origin-label'
              multiple
              value={filter.selectedOrigins}
              onChange={(e) => setFilter({...filter, selectedOrigins: e.target.value})}
              input={<OutlinedInput id="origin-chip" label="Origin" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={origins.find((org) => org.id === value)!.name} />
                  ))}
                </Box>
              )}>
              {origins.map((org) => (
                <MenuItem key={org.id} value={org.id} style={getStyles(org.id, origins, theme)}>
                  {org.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={() => setFilter({...filter, selectedOrigins: []})} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>
        </Box>

        {/* Owner Filter */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>
          <Typography variant='h6' width={'30%'}>Session owner</Typography>
          <Box width={'60%'}>
            <UserAutoComplete selectedUser={filter.selectedUser}
                              onChange={(selectedUser) => setFilter({...filter, selectedUser})} />
              {/*<Button onClick={dispatch(setTimeTrackerSelectedUser)} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>*/}
          </Box>
        </Box>

        {/*/!* Duration Filter *!/*/}
        {/*<Box sx={{ display: 'flex', alignItems: 'center', mt: '1rem', color: '#00101D' }}>*/}
        {/*  <Typography variant='h6' width={'30%'}>Duration</Typography>*/}
        {/*  <FormControl sx={{ width: '60%', display: 'flex', flexDirection: 'row', gap: '1rem' }}>*/}
        {/*  <InputLabel id="duration-operator-select-label">Operator</InputLabel>*/}
        {/*  <Select*/}
        {/*    id="duration-operator-select"*/}
        {/*    labelId="duration-operator-select-label"*/}
        {/*    label="Operator"*/}
        {/*    sx={{ width: '35%' }}*/}
        {/*    value={durationOperator}*/}
        {/*    onChange={(event) => setDurationOperator(event.target.value)}*/}
        {/*  >*/}
        {/*    <MenuItem aria-label="None" value="" />*/}
        {/*    {durationLengthOperators.map((dur) => (*/}
        {/*      <MenuItem key={dur.apiTitle} value={dur.apiTitle}>*/}
        {/*        {dur.title}*/}
        {/*      </MenuItem>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*    <TextField */}
        {/*      id="duration-value"*/}
        {/*      label="Value" */}
        {/*      variant='outlined'*/}
        {/*      value={durationValue}*/}
        {/*      onChange={(event) => setDurationValue(event.target.value)}*/}
        {/*      sx={{ width: '65%' }}*/}
        {/*    />*/}
        {/*  </FormControl>*/}
        {/*  <Button onClick={handleClearDuration} sx={{ ml: 'auto', color: '#00101D' }}>Clear</Button>*/}
        {/*</Box>*/}
        
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#00101D' }}>Cancel</Button>
        <Button onClick={handleApply} variant="contained" sx={{ backgroundColor: '#00101D' }}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
