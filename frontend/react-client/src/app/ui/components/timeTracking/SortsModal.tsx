import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { SortCriteria } from '../../../types/SortCriteria';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface SortsModalProps
{
  open: boolean,
  onClose: () => void,
  onApplySorts: (sorts: SortCriteria[]) => void
}

const SortsModal = ({
  open,
  onClose,
  onApplySorts,
}: SortsModalProps): JSX.Element => {
  const timeTracker = useSelector((state: RootState) => state.timeTracker);
  const [sorts, setSorts] = React.useState<SortCriteria[]>(timeTracker.sorts);

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
