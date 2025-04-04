import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/animeDetail.css";

const API_URL = "https://api.jikan.moe/v4/anime";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAnimeDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/${id}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Failed to fetch anime details");
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching anime details:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
    return () => controller.abort(); 
  }, [id]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setShowPopup(true);
  };

  const confirmStatusChange = () => {
    const updatedWatchlist = [...watchlist];
    const existingAnime = updatedWatchlist.find((a) => a.id === anime.mal_id);

    if (existingAnime) {
      existingAnime.status = selectedStatus;
    } else {
      updatedWatchlist.push({
        id: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.image_url,
        status: selectedStatus,
      });
    }

    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setShowPopup(false);
  };

  if (loading) return <p className="loading">Loading anime details...</p>;
  if (!anime) return <p className="error">Anime not found.</p>;

  return (
    <div className="anime-detail-container">
      <Navbar />

      <div className="anime-banner" style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}>
        <div className="overlay">
          <h1>{anime.title}</h1>
          <p className="tagline">{anime.synopsis?.slice(0, 150)}...</p>
        </div>
      </div>

      <div className="anime-content">
        <div className="left">
          <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-poster" />

          {anime.trailer?.url && (
            <a href={anime.trailer.url} target="_blank" rel="noopener noreferrer" className="watch-trailer">
              ▶ Play Trailer
            </a>
          )}

          <div className="add-to-list">
            <h3>Add to List</h3>
            {["Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"].map((status) => (
              <button key={status} onClick={() => handleStatusChange(status)} className={status.toLowerCase().replace(" ", "-")}>
                {status === "Watching" ? "📺" : status === "Completed" ? "✔" : status === "On Hold" ? "⏳" : status === "Dropped" ? "❌" : "📌"} {status}
              </button>
            ))}
          </div>
        </div>

        <div className="right">
          <h2>{anime.title}</h2>
          <p>{anime.synopsis}</p>

          <div className="genres">
            {anime.genres.map((g) => (
              <span key={g.mal_id} className="genre-tag">{g.name}</span>
            ))}
          </div>

          <div className="anime-details">
            <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
            <p><strong>Rating:</strong> {anime.score || "N/A"}</p>
            <p><strong>Aired:</strong> {anime.aired?.string || "N/A"}</p>
            <p><strong>Status:</strong> {anime.status}</p>
            <p><strong>Season:</strong> {anime.season ? anime.season.toUpperCase() : "Unknown"}</p>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to add this anime to the <strong>{selectedStatus}</strong> list?</p>
            <button onClick={confirmStatusChange} className="confirm-btn">Confirm</button>
            <button onClick={() => setShowPopup(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
