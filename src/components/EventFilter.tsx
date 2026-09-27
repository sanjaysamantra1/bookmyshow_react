import { useEvents } from "../context/AppContext";
import "./event-filter.css";
export default function EventFilter() {
  const e = useEvents();
  const group = (
    title: string,
    items: string[],
    key: "categories" | "languages" | "cities",
    toggle: (x: string) => void,
  ) => (
    <>
      <div className="filter-section mb-4">
        <h6 className="filter-title">{title}</h6>
        <div className="filter-options">
          {items.map((x) => (
            <label
              className={
                "filter-chip " + (e.filters[key].includes(x) ? "selected" : "")
              }
              key={x}
            >
              <input
                type="checkbox"
                checked={e.filters[key].includes(x)}
                onChange={() => toggle(x)}
              />
              {x}
            </label>
          ))}
        </div>
      </div>
      {title !== "Language" && <hr className="filter-divider" />}
    </>
  );
  return (
    <div className="filter-panel">
      <div className="filter-header d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Filters</span>
        {e.hasActiveFilters && (
          <button className="btn-clear" onClick={e.clearFilters}>
            Clear All
          </button>
        )}
      </div>
      {group("City", e.allCities, "cities", e.toggleCity)}
      {group("Category", e.allCategories, "categories", e.toggleCategory)}
      {group("Language", e.allLanguages, "languages", e.toggleLanguage)}
    </div>
  );
}
