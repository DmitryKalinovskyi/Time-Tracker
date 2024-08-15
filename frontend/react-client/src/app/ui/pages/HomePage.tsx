import { Box, Container } from "@mui/material";
import SessionControl from "../components/SessionControl.tsx";
import SessionList from "../components/SessionList.tsx";

export default function HomePage() {
  return (
    <>
      <Container>
        <Box mt={4}>
          <SessionControl />
          <SessionList />
        </Box>
      </Container>
    </>
  );
};