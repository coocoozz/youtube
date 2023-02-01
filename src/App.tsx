import { Outlet } from "react-router-dom";
import { YoutubeContextProvider } from "./context/youtubeContext";

export default function App() {
  return (
    <>
      <YoutubeContextProvider>
        <Outlet />
      </YoutubeContextProvider>
    </>
  );
}
