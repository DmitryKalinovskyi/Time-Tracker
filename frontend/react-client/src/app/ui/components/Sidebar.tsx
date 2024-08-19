import { AccessTime, BarChart, CalendarToday, DataSaverOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { formatDuration } from "./SessionList";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "@mui/material/Link";

const Sidebar: React.FC = () => {
  const currentSessionDuration = useSelector((state : RootState) => state.timeTracker.currentSessionDuration);
  const buttonSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2, // Space between children
    padding: '10px', // Add padding to the button
    height: '50px', // Set a consistent height for the button
  };

  const iconSx = {
    minWidth: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textSx = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  };
  return (
    <>
      <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#00101D',
        color: '#FFF',
        padding: '1rem',
        borderRadius: 'inherit'
      }}
    >
      <List>
          <ListItem>
              <ListItemIcon>
                <DataSaverOff sx={{ color: '#FFF', fontSize: '3rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Timekeeper" 
                primaryTypographyProps={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              />
            </ListItem>

           <Divider sx={{ my: 3, borderColor: '#2C3E50', borderBottomWidth: 2.5}}/>

            <ListItemButton 
                  component={Link} 
                  href="/home" 
                  sx={buttonSx}
                >
            <ListItemIcon 
              sx={iconSx}
            >
            <AccessTime sx={{ color: '#FFF', height: '100%' }} />
            </ListItemIcon>

            <ListItemText 
              primary="Time Tracker" 
              primaryTypographyProps={{ sx: { textSx }} }
            />

            {currentSessionDuration > 0 && (
              <Typography 
                variant="body2" 
                sx={{ 
                  ml: 'auto', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
              >
                {formatDuration(currentSessionDuration)}
              </Typography>
            )}
          </ListItemButton>

        <ListItemButton component={Link} href="/calendar" sx={buttonSx}>
          <ListItemIcon sx={iconSx}>
            <CalendarToday sx={{ color: '#FFF' }} />
          </ListItemIcon>
          <ListItemText primary="Calendar" sx={textSx} />
        </ListItemButton>

        <Divider sx={{ my: 2, borderColor: '#2C3E50', borderBottomWidth: 2.5}} />

        <ListItemButton component={Link} href="/reports" sx={buttonSx}>
          <ListItemIcon sx={iconSx}>
            <BarChart sx={{ color: '#FFF' }} />
          </ListItemIcon>
          <ListItemText primary="Reports" sx={textSx} />
        </ListItemButton>

        </List>
    </Box>
    </>
  );
}

export default Sidebar
