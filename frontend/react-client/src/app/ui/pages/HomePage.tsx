import SessionControl from "../components/timeTracking/Timer.tsx";
import SessionList from "../components/timeTracking/SessionList.tsx";

export default function HomePage() {
  return (
    <>
        <SessionControl />
        <SessionList />
    </>
  );
};