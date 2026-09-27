import { Link } from "react-router-dom";
import { useMovies, useCity } from "../context/AppContext";
import MovieFilter from "./MovieFilter";
import "./movie-list.css";
export default function MovieList() {
  const m = useMovies(),
    city = useCity();
  return (
    <div className="movie-list-page py-4">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-baseline gap-2 mb-4">
          <h5 className="fw-bold mb-0">Movies in {city.selectedCity}</h5>
          <span className="result-count text-muted">
            {m.filteredMovies.length} results{" "}
            {m.hasActiveFilters && (
              <span className="text-danger">(filtered)</span>
            )}
          </span>
        </div>
        <div className="row g-0">
          <div className="col-12 col-md-3 col-lg-2 mb-4 mb-md-0 pe-md-3">
            <MovieFilter />
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            {m.filteredMovies.length === 0 ? (
              <div className="no-results text-center py-5">
                <div className="mb-3" style={{ fontSize: 48 }}>
                  🎬
                </div>
                <h6 className="fw-bold text-muted">
                  No movies match your filters
                </h6>
                <p className="text-muted small mb-3">
                  Try removing some filters
                </p>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={m.clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="row g-3">
                {m.filteredMovies.map((movie: any) => (
                  <div
                    className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2"
                    key={movie.id}
                  >
                    <Link
                      to={`/movies/${movie.id}`}
                      className="text-decoration-none"
                    >
                      <div className="movie-card">
                        <div className="poster-wrapper">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="poster-img"
                          />
                          <span className="cert-badge">
                            {movie.certification}
                          </span>
                          <div className="hover-overlay">
                            <button className="btn-book">Book Tickets</button>
                          </div>
                        </div>
                        <div className="movie-info">
                          <div className="rating-row">
                            <span className="star">★</span>
                            <span className="rating-val">
                              {movie.rating}/10
                            </span>
                            <span className="votes text-muted">
                              · {movie.votes}
                            </span>
                          </div>
                          <h6 className="movie-title">{movie.title}</h6>
                          <p className="movie-meta">
                            {movie.genre.join(" / ")}
                          </p>
                          <p className="movie-lang">
                            {movie.language.join(", ")}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
