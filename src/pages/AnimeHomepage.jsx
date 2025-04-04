import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import GenreFilter from "../components/GenreFilter";
import "../styles/AnimeHomepage.css";
import { Link } from "react-router-dom";
import AnimeSlider from "../components/AnimeSlider";

const API_URL = "https://api.jikan.moe/v4/top/anime";

export default function AnimeHomepage() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [hoveredAnime, setHoveredAnime] = useState(null);

  const genres = ["Romance", "Comedy", "Drama", "Adventure", "Action", "Fantasy", "Slice of Life", "Supernatural", "Psychological", "Mecha"];

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setAnimeList(data.data);
      } catch (error) {
        console.error("Error fetching anime data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const getRandomAnime = (list, count) => {
    const randomSet = new Set();
    while (randomSet.size < count && list.length > randomSet.size) {
      const randomIndex = Math.floor(Math.random() * list.length);
      randomSet.add(list[randomIndex]);
    }
    return Array.from(randomSet);
  };

  const filteredAnime = animeList.filter((anime) => {
    const matchesSearch = anime.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre
      ? anime.genres.some((g) => g.name.toLowerCase() === selectedGenre.toLowerCase())
      : true;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="container">
      <Navbar />
      <AnimeSlider anime={getRandomAnime(animeList, 5)} />

      <header className="header">
        <h1>Trending This Week</h1>
        <input
          type="text"
          placeholder="What are you searching for?"
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <div className="content">
        <section className="anime-grid">
          {loading ? (
            [...Array(10)].map((_, index) => <div key={index} className="loading-placeholder" />)
          ) : filteredAnime.length > 0 ? (
            filteredAnime.map((anime) => (
              <Link 
                to={`/anime/${anime.mal_id}`} 
                key={anime.mal_id} 
                className="anime-card"
                onMouseEnter={() => setHoveredAnime(anime.mal_id)}
                onMouseLeave={() => setHoveredAnime(null)}
              >
                <img src={anime.images.jpg.image_url} alt={anime.title} className="anime-thumbnail" />
                <h2 className="anime-title">{anime.title}</h2>

                {hoveredAnime === anime.mal_id && (
                  <div className="anime-hover-details">
                    <p>{anime.synopsis.slice(0, 100)}...</p>
                    <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
                    <p><strong>Rating:</strong> {anime.score}</p>
                  </div>
                )}
              </Link>
            ))
          ) : (
            <p className="no-results">No anime found for this genre.</p>
          )}
        </section>

        <GenreFilter genres={genres} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      </div>
    </div>
  );
}
