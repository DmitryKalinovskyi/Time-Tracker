import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../features/timeTracking/timeTrackingSlice';

export type FilterType = 'day' | 'month' | 'year';

const FilterSelector = () => {
    const filter = useSelector((state: RootState) => state.timeTracker.filterType)
    const dispatch = useDispatch();

    const handleFilterChange = (event: any) => {
        dispatch(setFilter(event.target.value as FilterType));
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <FormControl variant="outlined" size="small" 
                        sx={{
                            width: '10rem',
                            color: '#00101D',
                            "& .MuiOutlinedInput-notchedOutline" : {
                                borderColor : "#00101D",
                             },
                             "&:hover .MuiOutlinedInput-notchedOutline" : {
                                borderColor : "#003366",
                                color: "#003366"
                             }
                            }}>
            <InputLabel id="view-select-label" sx={{
                color: "#003366",
                '$:hover': {
                    color: "#00101D"
                }
            }}>Filter By</InputLabel>
            <Select
              labelId="view-select-label"
              id="view-select"
              value={filter}
              onChange={handleFilterChange}
              label="Filter By"
            >
              <MenuItem value="day">Day</MenuItem>
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
        </div>
    )
}

export default FilterSelector;
