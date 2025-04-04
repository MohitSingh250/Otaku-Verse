import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Navbar.css";

export default function Navbar({ search, setSearch }) {
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistCount(storedList.length);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Otaku Verse
      </Link>

      {/* Search Bar in Navbar */}
      <input
        type="text"
        placeholder="Search Anime..."
        className="nav-search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="nav-links">
        <Link to="/watchlist" className="watchlist-btn">
          📋 Watchlist ({watchlistCount})
        </Link>
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
}
