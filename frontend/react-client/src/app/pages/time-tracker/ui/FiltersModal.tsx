import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Theme, MenuItem, useTheme, FormControl, InputLabel, Select, OutlinedInput, Chip, Stack,
} from '@mui/material';
import { addDays, addMonths, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { UserAutoComplete } from '../../../shared/ui/UserAutoComplete/UserAutoComplete.tsx';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {
  applyTimeTrackerFilter,
  getWorkSessions,
  TimeTrackerFilter
} from "@time-tracker/features/timeTracking/timeTrackingSlice.ts";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

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
  const {selectedUser, selectedOrigins, selectedDay} = useSelector((state: RootState) => state.timeTracker.filter);
  const [filter, setFilter] = useState<TimeTrackerFilter>({
    selectedUser: (selectedUser? {...selectedUser}: null),
    selectedOrigins,
    selectedDay
  });
  const dispatch = useDispatch();
  const handleClose = () => {
    setFilter({
      selectedUser: (selectedUser? {...selectedUser}: null),
      selectedOrigins,
      selectedDay
    });
    onClose();
  }
  const handleApply = () => {
    dispatch(applyTimeTrackerFilter(filter));
    onClose();
  }

  console.log()
  return (
      <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          PaperProps={{sx: {color: '#00101D', borderStyle: 'solid'}}}>
        <DialogTitle sx={{color: '#00101D'}}>
          Add Filters
        </DialogTitle>

        <DialogContent sx={{display: 'flex', flexDirection: 'column', m: '1rem', px: '1rem'}}>
          <Grid container sx={{pt: 1}} columns={12} rowSpacing={2}>
            {/* Date Range Filter */}
            <Grid item xs={3} className="flex items-center">
              <Typography variant='h6'>Day</Typography>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <DatePicker value={filter.selectedDay ? dayjs(filter.selectedDay) : undefined}
                            onChange={(value) => setFilter({...filter, selectedDay: value.toDate()})}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1} className="flex items-center">
              <Button onClick={() => setFilter({...filter, selectedDay: null})}
                      sx={{ml: 'auto', color: '#00101D'}}>Clear</Button>
            </Grid>

            {/* Origin Filter */}
            <Grid item  xs={3} className="flex items-center">
              <Typography variant='h6' width={'30%'}>Origin</Typography>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel id="multiple-origin-label">Origin</InputLabel>
                <Select
                    id="session-origin-select"
                    labelId='multiple-origin-label'
                    multiple
                    value={filter.selectedOrigins}
                    onChange={(e) => setFilter({...filter, selectedOrigins: e.target.value})}
                    input={<OutlinedInput id="origin-chip" label="Origin"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                          {selected.map((value) => (
                              <Chip key={value} label={origins.find((org) => org.id === value)!.name}/>
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
            </Grid>
            <Grid item  xs={1} className="flex items-center">
              <Button onClick={() => setFilter({...filter, selectedOrigins: []})}
                      sx={{ml: 'auto', color: '#00101D'}}>Clear</Button>
            </Grid>

            {/* Owner Filter */}
            <Grid item  xs={3} className="flex items-center">
              <Typography variant='h6'>Session owner</Typography>
            </Grid>
            <Grid item  xs={8}>
              <UserAutoComplete selectedUser={filter.selectedUser}
                                onChange={(selectedUser) => setFilter({...filter, selectedUser})}/>
            </Grid>


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
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} sx={{color: '#00101D'}}>Cancel</Button>
          <Button onClick={handleApply} variant="contained" sx={{backgroundColor: '#00101D'}}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
  );
}
