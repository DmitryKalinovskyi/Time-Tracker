import { AccessTime, BarChart, CalendarToday, DataSaverOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { formatDurationToHMS } from "../../../misc/TimeFormatter";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";

import { useTimerContext } from "../../../features/timeTracking/TimerProvider";


const Sidebar: React.FC = () => {
  const { duration } = useTimerContext();

  const buttonSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    padding: '10px',
    height: '50px',
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
                  to="/home" 
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

            {duration > 0 && (
              <Typography 
                variant="body2" 
                sx={{ 
                  ml: 'auto', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
              >
                {formatDurationToHMS(duration)}
              </Typography>
            )}
          </ListItemButton>

        <ListItemButton component={Link} to="/calendar" sx={buttonSx}>
          <ListItemIcon sx={iconSx}>
            <CalendarToday sx={{ color: '#FFF' }} />
          </ListItemIcon>
          <ListItemText primary="Calendar" sx={textSx} />
        </ListItemButton>

        <Divider sx={{ my: 2, borderColor: '#2C3E50', borderBottomWidth: 2.5}} />

        <ListItemButton component={Link} to="/reports" sx={buttonSx}>
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

export default Sidebar;
