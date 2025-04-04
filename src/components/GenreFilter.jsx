import "../styles/GenreFilter.css";

export default function GenreFilter({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <div className="genre-container">
      <h3 className="genre-title">Famous Categories</h3>
      <ul className="genre-list">
        {genres.map((genre) => (
          <li
            key={genre}
            className={`genre-item ${genre === selectedGenre ? "active" : ""}`}
            onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}
