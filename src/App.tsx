import { Outlet } from "react-router-dom";
import { YoutubeContextProvider } from "./context/youtubeContext";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <YoutubeContextProvider>
        <Outlet />
      </YoutubeContextProvider>
    </>
  );
}
