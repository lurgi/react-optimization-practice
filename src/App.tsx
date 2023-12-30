import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./routes/Home";
import Throttle from "./routes/Throttle";
import Debounce from "./routes/Debounce";
import VirtualizedList from "./routes/VirtualizedList";

import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/throttle" element={<Throttle />} />
        <Route path="/debounce" element={<Debounce />} />
        <Route path="/virtualized-list" element={<VirtualizedList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
