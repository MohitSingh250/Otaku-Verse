import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimeHomepage from "./pages/AnimeHomepage";
import AnimeDetail from "./pages/AnimeDetail";
import Watchlist from "./pages/Watchlist";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimeHomepage />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
