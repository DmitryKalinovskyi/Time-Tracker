import { Typography } from "@mui/material";
import TimeTracker from "../components/TimeTracker.tsx";

export default function HomePage() {
  return (
    <>
      <Typography variant="h4" className="text-blue-800" sx={{ mb: 4 }}>
        Welcome to Time Tracker
      </Typography>
      <TimeTracker />
    </>
  );
};