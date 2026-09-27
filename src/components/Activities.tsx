import { useMemo, useState } from "react";
import {
  ACTIVITIES,
  ALL_ACTIVITY_CATEGORIES,
  ALL_ACTIVITY_CITIES,
} from "../data/activities.data";
import { useCity } from "../context/AppContext";
import "./activities.css";
const icons: any = {
  Workshop: "🎨",
  Gaming: "🎮",
  Cooking: "👨‍🍳",
  Adventure: "🧗",
  "Water Sports": "🏄",
  Art: "🖌️",
  Photography: "📷",
  Wellness: "🧘",
  Racing: "🏎️",
  All: "✨",
};
export default function Activities() {
  const city = useCity();
  const [cat, setCat] = useState("All"),
    [activeCity, setActiveCity] = useState(
      ALL_ACTIVITY_CITIES.includes(city.selectedCity)
        ? city.selectedCity
        : "All",
    );
  const categories = ["All", ...ALL_ACTIVITY_CATEGORIES],
    filtered = useMemo(
      () =>
        ACTIVITIES.filter(
          (a) =>
            (cat === "All" || a.category === cat) &&
            (activeCity === "All" || a.city === activeCity),
        ),
      [cat, activeCity],
    );
  const icon = (x: string) => icons[x] || "⭐";
  return (
    <div className="activities-page">
      <div className="activities-header">
        <div className="container py-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <span style={{ fontSize: 44 }}>🎯</span>
            <div>
              <h2 className="act-title mb-0">Activities</h2>
              <p className="act-sub mb-0">
                Workshops, Adventures, Wellness, Gaming & more
              </p>
            </div>
          </div>
          <div className="category-badges d-flex gap-2 flex-wrap">
            {categories.slice(1, 6).map((c) => (
              <span className="cat-badge-hero" key={c}>
                {icon(c)} {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="filters-row d-flex gap-4 flex-wrap align-items-start mb-4">
          <div className="filter-group">
            <span className="filter-label">Category</span>
            <div className="chip-row">
              {categories.map((c) => (
                <button
                  key={c}
                  className={"chip " + (cat === c ? "chip-active" : "")}
                  onClick={() => setCat(c)}
                >
                  {icon(c)} {c}
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
              {ALL_ACTIVITY_CITIES.map((c) => (
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
        <p className="result-label mb-3">{filtered.length} activities found</p>
        {filtered.length === 0 ? (
          <div className="empty-state text-center py-5">
            <div style={{ fontSize: 48 }}>🎯</div>
            <h6 className="mt-3 text-muted">
              No activities found for selected filters
            </h6>
          </div>
        ) : (
          <div className="activities-grid">
            {filtered.map((a: any) => (
              <div className="act-card" key={a.id}>
                <div className="act-img-wrap">
                  <img src={a.poster} alt={a.title} className="act-img" />
                  <span className="act-category-icon">{icon(a.category)}</span>
                  {a.tag && <span className="act-tag">{a.tag}</span>}
                  <div className="act-hover">
                    <button className="btn-act-book">Book Now</button>
                  </div>
                </div>
                <div className="act-info">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="act-category-pill">{a.category}</span>
                    <span className="act-age">{a.ageGroup}</span>
                  </div>
                  <h6 className="act-name">{a.title}</h6>
                  <p className="act-meta">
                    📍 {a.venue}, {a.city}
                  </p>
                  <p className="act-meta">
                    📅 {a.date} · ⏱ {a.duration}
                  </p>
                  <p className="act-desc">{a.description}</p>
                  <div className="includes-row">
                    {a.includes.map((x: string) => (
                      <span className="include-chip" key={x}>
                        ✓ {x}
                      </span>
                    ))}
                  </div>
                  <div className="act-footer">
                    <span className="act-price">{a.price}</span>
                    <button className="btn-act-book-sm">Book Now</button>
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
