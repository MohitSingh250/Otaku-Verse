import "../styles/GenreFilter.css";

export default function GenreFilter({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <aside className="sidebar">
      <h3>My Favourite Categories</h3>
      <p>Favouriting categories will improve your recommendations.</p>
      <ul className="categories">
        {genres.map((genre) => (
          <li
            key={genre}
            className={genre === selectedGenre ? "active" : ""}
            onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
          >
            {genre}
          </li>
        ))}
      </ul>
    </aside>
  );
}
