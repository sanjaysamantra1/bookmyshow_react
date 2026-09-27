import { useMovies } from "../context/AppContext";
import "./movie-filter.css";
export default function MovieFilter() {
  const m = useMovies();
  return (
    <div className="filter-panel">
      <div className="filter-header d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Filters</span>
        {m.hasActiveFilters && (
          <button className="btn-clear" onClick={m.clearFilters}>
            Clear All
          </button>
        )}
      </div>
      <div className="filter-section mb-4">
        <h6 className="filter-title">Language</h6>
        <div className="filter-options">
          {m.allLanguages.map((x: string) => (
            <label
              className={
                "filter-chip " +
                (m.filters.languages.includes(x) ? "selected" : "")
              }
              key={x}
            >
              <input
                type="checkbox"
                checked={m.filters.languages.includes(x)}
                onChange={() => m.toggleLanguage(x)}
              />
              {x}
            </label>
          ))}
        </div>
      </div>
      <hr className="filter-divider" />
      <div className="filter-section">
        <h6 className="filter-title">Genre</h6>
        <div className="filter-options">
          {m.allGenres.map((x: string) => (
            <label
              className={
                "filter-chip " +
                (m.filters.genres.includes(x) ? "selected" : "")
              }
              key={x}
            >
              <input
                type="checkbox"
                checked={m.filters.genres.includes(x)}
                onChange={() => m.toggleGenre(x)}
              />
              {x}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
