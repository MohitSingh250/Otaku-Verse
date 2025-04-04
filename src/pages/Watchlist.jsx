import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../styles/watchlist.css";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedList);
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedList = watchlist.filter((anime) => anime.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  // Group anime by their status
  const statuses = ["Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"];
  const categorizedWatchlist = statuses.map((status) => ({
    status,
    animeList: watchlist.filter((anime) => anime.status === status),
  }));

  return (
    <div className="watchlist-container">
      <Navbar />
      <h1>My Watchlist</h1>
      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p>No anime added yet. Start adding your favorites!</p>
        </div>
      ) : (
        <div className="watchlist-content">
          {categorizedWatchlist.map(
            ({ status, animeList }) =>
              animeList.length > 0 && (
                <div key={status} className="status-section">
                  <h2 className="status-header">{status}</h2>
                  <div className="watchlist-grid">
                    {animeList.map((anime) => (
                      <div key={anime.id} className="watchlist-item">
                        <img src={anime.image} alt={anime.title} />
                        <h3>{anime.title}</h3>
                        <p>Status: {anime.status}</p>
                        <button onClick={() => removeFromWatchlist(anime.id)}>Remove</button>
                        <Link to={`/anime/${anime.id}`} className="details-btn">
                          Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
