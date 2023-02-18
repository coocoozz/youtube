import { Outlet } from "react-router-dom";
import { YoutubeContextProvider } from "./context/youtubeContext";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <YoutubeContextProvider>
          <Outlet />
        </YoutubeContextProvider>
      </QueryClientProvider>
    </>
  );
}
