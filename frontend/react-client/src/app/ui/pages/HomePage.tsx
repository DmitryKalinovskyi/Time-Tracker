import Timer from "../components/timeTracking/Timer.tsx";
import SessionList from "../components/timeTracking/SessionList.tsx";
import { Box } from "@mui/material";
import DateSelector from "../components/timeTracking/DateSelector.tsx";
import FilterSelector from "../components/timeTracking/FilterSelector.tsx";

export default function HomePage() {
  return (
    <>
        <Timer />
        {/* <Divider sx={{mb: 2, borderBottomWidth: 2.5, backgroundColor: "#00101D", opacity: 0.5}} /> */}
        <Box display={'flex'} justifyContent={'flex-end'} px={2} mt={4} gap={2} >
          <FilterSelector />
          <DateSelector  />
        </Box>
        <Box height={'60%'}>
          <SessionList />
        </Box>
        
    </>
  );
};