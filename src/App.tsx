import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./routes/Home";
import Throttle from "./routes/Throttle";
import Debounce from "./routes/Debounce";
import VirtualizedList from "./routes/VirtualizedList";

import Header from "./components/Header";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Header />
        <main className="py-2 flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/throttle" element={<Throttle />} />
            <Route path="/debounce" element={<Debounce />} />
            <Route path="/virtualized-list" element={<VirtualizedList />} />
          </Routes>
        </main>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
