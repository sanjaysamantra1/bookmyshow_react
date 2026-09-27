import { useMemo, useState } from "react";
import { STREAM_TITLES, STREAM_CATEGORIES } from "../data/stream.data";
import "./stream.css";
export default function Stream() {
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(
    () =>
      filter === "All"
        ? STREAM_TITLES
        : filter === "Series"
          ? STREAM_TITLES.filter((t) => t.type === "Series")
          : filter === "Movie"
            ? STREAM_TITLES.filter((t) => t.type === "Movie")
            : STREAM_TITLES.filter((t) => t.tag === filter),
    [filter],
  );
  return (
    <div className="stream-page">
      <div className="stream-hero">
        <div className="hero-overlay-gradient" />
        <div className="stream-hero-content container">
          <div className="stream-logo-badge">▶ BookMyShow Stream</div>
          <h1 className="stream-headline">
            Watch Anywhere.
            <br />
            Anytime. Only Here.
          </h1>
          <p className="stream-sub">
            Exclusive web series, award-winning films & originals — all in one
            place.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <button className="btn-stream-primary">
              ▶ Start Watching Free
            </button>
            <button className="btn-stream-outline">Browse All Titles</button>
          </div>
        </div>
        <div className="hero-featured container">
          {STREAM_TITLES.slice(0, 3).map((t) => (
            <div className="hero-card" key={t.id}>
              <img src={t.poster} alt={t.title} className="hero-card-img" />
              {t.tag && <span className="hero-card-tag">{t.tag}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="container py-5">
        <div className="filter-row mb-4">
          {STREAM_CATEGORIES.map((c) => (
            <button
              key={c}
              className={"filter-chip " + (filter === c ? "active" : "")}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="titles-grid">
          {filtered.map((t) => (
            <div className="title-card" key={t.id}>
              <div className="title-img-wrap">
                <img src={t.poster} alt={t.title} className="title-img" />
                <div className="title-overlay">
                  <button className="btn-play-now">▶ Watch Now</button>
                </div>
                {t.tag && <span className="title-tag">{t.tag}</span>}
                <span className="title-type-badge">{t.type}</span>
              </div>
              <div className="title-meta">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className="title-rating">★ {t.rating}</span>
                  <span className="title-lang">{t.language}</span>
                </div>
                <p className="title-name">{t.title}</p>
                <p className="title-genre">{t.genre.join(" · ")}</p>
                {t.seasons && (
                  <p className="title-seasons">
                    {t.seasons} Season{t.seasons > 1 ? "s" : ""}
                  </p>
                )}
                {t.duration && <p className="title-seasons">{t.duration}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="exclusive-banner mt-5 d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <p className="exclusive-eyebrow">🌟 BMS Originals</p>
            <h4 className="exclusive-title">
              Watch stories only on BookMyShow Stream
            </h4>
            <p className="exclusive-sub">
              Exclusive originals you won't find anywhere else
            </p>
          </div>
          <button className="btn-stream-primary">Explore Originals</button>
        </div>
      </div>
    </div>
  );
}
