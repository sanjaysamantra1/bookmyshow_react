import { useMemo, useState } from "react";
import { PLAYS, ALL_PLAY_TYPES, ALL_PLAY_CITIES } from "../data/plays.data";
import { useCity } from "../context/AppContext";
import "./plays.css";
export default function Plays() {
  const city = useCity();
  const [type, setType] = useState("All"),
    [activeCity, setActiveCity] = useState(
      ALL_PLAY_CITIES.includes(city.selectedCity) ? city.selectedCity : "All",
    );
  const types = ["All", ...ALL_PLAY_TYPES],
    filtered = useMemo(
      () =>
        PLAYS.filter(
          (p) =>
            (type === "All" || p.type === type) &&
            (activeCity === "All" || p.city === activeCity),
        ),
      [type, activeCity],
    );
  return (
    <div className="plays-page">
      <div className="plays-header">
        <div className="container py-4">
          <div className="d-flex align-items-center gap-3 mb-2">
            <span className="plays-icon">🎭</span>
            <div>
              <h2 className="plays-title mb-0">Plays & Theatre</h2>
              <p className="plays-sub mb-0">
                Drama, Musicals, Comedy, Classical & more
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="filters-row d-flex gap-4 flex-wrap align-items-center mb-4">
          <div className="filter-group">
            <span className="filter-label">Type</span>
            <div className="chip-row">
              {types.map((t) => (
                <button
                  key={t}
                  className={"chip " + (type === t ? "chip-active" : "")}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">City</span>
            <div className="chip-row">
              <button
                className={
                  "chip " + (activeCity === "All" ? "chip-active" : "")
                }
                onClick={() => setActiveCity("All")}
              >
                All
              </button>
              {ALL_PLAY_CITIES.map((c) => (
                <button
                  key={c}
                  className={"chip " + (activeCity === c ? "chip-active" : "")}
                  onClick={() => setActiveCity(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="result-label mb-3">{filtered.length} shows found</p>
        {filtered.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div style={{ fontSize: 48 }}>🎭</div>
            <h6 className="mt-3 text-muted">
              No shows found for selected filters
            </h6>
          </div>
        ) : (
          <div className="plays-grid">
            {filtered.map((p: any) => (
              <div className="play-card" key={p.id}>
                <div className="play-img-wrap">
                  <img src={p.poster} alt={p.title} className="play-img" />
                  {p.tag && (
                    <span
                      className={
                        "play-tag " +
                        (p.tag === "Selling Fast" ? "tag-hot" : "")
                      }
                    >
                      {p.tag}
                    </span>
                  )}
                  <div className="play-hover">
                    <button className="btn-book-play">Book Tickets</button>
                  </div>
                </div>
                <div className="play-info">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="play-type-badge">{p.type}</span>
                    <span className="play-lang">{p.language.join(" / ")}</span>
                  </div>
                  <h6 className="play-name">{p.title}</h6>
                  <p className="play-meta">📍 {p.venue}</p>
                  <p className="play-meta">
                    📅 {p.date} · ⏱ {p.duration}
                  </p>
                  <p className="play-desc">{p.description}</p>
                  <div className="cast-line">
                    <span className="cast-label">Cast:</span>{" "}
                    {p.cast.join(", ")}
                  </div>
                  <div className="play-footer d-flex align-items-center justify-content-between mt-2">
                    <span className="play-price">{p.price}</span>
                    <button className="btn-book-play-sm">Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
