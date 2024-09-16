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
import { UserAutoComplete } from '../calendar/UserAutoComplete/UserAutoComplete';
import User from '../../../types/User';
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
  const me = useAuth().user!;
  const [filters, setFilters] = useState<FilterCriteria[]>([ ]);
  const [origin, setOrigin] = useState<string[]>([]);
  const [editedBy, setEditedBy] = useState<User>(me);
  

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleOriginChange = (event: SelectChangeEvent<typeof origin>) => {
    const value = event.target.value;
    console.log(value);
    setOrigin(typeof value === 'string' ? value.split(',') : value,);
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
    }}>
      <DialogTitle
      sx={{
        color: '#00101D',
        borderBottom: '1px solid #00101D',
      }}
      >
          Add Filters
      </DialogTitle>

      <DialogContent
      sx={{
        display: 'flex',
        justifyContent: 'stretch',
        alignItems: 'stretch',
        flexDirection: 'column',
        border: "1px solid black",
        m: '1rem',
        px: '1rem'
      }}>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'stretch',
          alignItems: 'stretch',
          mt: '1rem',
          color: '#00101D'
        }}>
          <Typography variant='h6' display={'block'} width={'30%'} >Date Range</Typography>
          <DateRangePicker 
              ranges={predefinedRanges} 
              format="dd.MM.yyyy" 
              character=' - ' 
              style={{width: '70%', height: '56px'}}
              placeholder="Select Date Range"
              onOk={(date: [Date, Date]) => console.log(date[0].toISOString().split('T')[0] + ' ~ ' + date[1].toISOString().split('T')[0] )}
               />
        </Box>

        <Box
        sx={{
          display: 'flex',
          justifyContent: 'stretch',
          alignItems: 'stretch',
          mt: '1rem',
          color: '#00101D'
        }}>
          <Typography variant='h6' display={'block'} width={'30%'} sx={{verticalAlign: 'middle'}} >Origin</Typography>
          <FormControl sx={{width: '70%', height: '56px'}}>
            <InputLabel id="multiple-origin-label">Origin</InputLabel>
            <Select
            id="session-origin-selector"
            labelId='multiple-origin-label'
            multiple
            value={origin}
            onChange={handleOriginChange}
            input={<OutlinedInput id="origin-chip" label="Origin" />} 
            renderValue={(selected) => (
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selected.map((value) => (
                  <Chip key={value} label={origins.find((org) => org.id === value)!.name} />
                ))}
              </Box>
            )}>
              {origins.map((org) => (
                <MenuItem
                  key={org.id}
                  value={org.id}
                  style={getStyles(org.id, origin, theme)}
                >
                  {org.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
        sx={{
          display: 'flex',
          justifyContent: 'stretch',
          alignItems: 'stretch',
          mt: '1rem',
          color: '#00101D',
          height: '56px'
        }}>
          <Typography variant='h6' display={'block'} width={'30%'} >Edited By</Typography>
          <Box width={'70%'}>
            {/* <UserAutoComplete selectedUser={editedBy} onChange={(user) => console.log(user)}  /> */}
          </Box>
        </Box>
        

      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} sx={{
            color: '#00101D',
            '&:hover': { color: '#003366' },
          }}>Cancel</Button>
        <Button onClick={handleApply} variant="contained" sx={{
            backgroundColor: '#00101D',
            '&:hover': {
              backgroundColor: '#003366',
            },
          }}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltersModal;
