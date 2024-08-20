import Timer from "../components/timeTracking/Timer.tsx";
import SessionList from "../components/timeTracking/SessionList.tsx";

export default function HomePage() {
  return (
    <>
        <Timer />
        <SessionList />
    </>
  );
};