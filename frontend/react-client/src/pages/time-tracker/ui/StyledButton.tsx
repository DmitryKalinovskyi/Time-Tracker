import Button from '@mui/material/Button';

const StyledButton: React.FC<{label: string, onClickHandler: Function}> = ({label, onClickHandler}) => {
  return (
    <Button
      variant="outlined"
      onClick={() => onClickHandler()}
      sx={{
        width: '7rem',
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
    <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
        {label}
    </span>
    </Button>
  );
}

export default StyledButton;