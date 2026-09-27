import { useEvents } from "../context/AppContext";
import EventFilter from "./EventFilter";
import "./event-list.css";
export default function EventList() {
  const e = useEvents();
  return (
    <div className="event-list-page py-4">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-baseline gap-2 mb-4">
          <h5 className="fw-bold mb-0">Live Events</h5>
          <span className="result-count text-muted">
            {e.filteredEvents.length} results{" "}
            {e.hasActiveFilters && (
              <span className="text-danger">(filtered)</span>
            )}
          </span>
        </div>
        <div className="row g-0">
          <div className="col-12 col-md-3 col-lg-2 mb-4 mb-md-0 pe-md-3">
            <EventFilter />
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            {e.filteredEvents.length === 0 ? (
              <div className="no-results text-center py-5">
                <div className="no-results-icon mb-3">🎭</div>
                <h6 className="fw-bold text-muted">
                  No events match your filters
                </h6>
                <p className="text-muted small mb-3">
                  Try removing some filters to see more events
                </p>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={e.clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="row g-3">
                {e.filteredEvents.map((event: any) => (
                  <div
                    className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2"
                    key={event.id}
                  >
                    <div className="event-card">
                      <div className="banner-wrapper">
                        <img
                          src={event.banner}
                          alt={event.name}
                          className="banner-img"
                        />
                        {event.tag && (
                          <span
                            className={
                              "event-tag " +
                              (event.tag === "Selling Fast"
                                ? "tag-hot"
                                : event.tag === "New"
                                  ? "tag-new"
                                  : "")
                            }
                          >
                            {event.tag}
                          </span>
                        )}
                        <div className="hover-overlay">
                          <button className="btn-book">Book Now</button>
                        </div>
                      </div>
                      <div className="event-info">
                        <h6 className="event-name">{event.name}</h6>
                        <p className="event-meta">
                          📍 {event.city} · {event.venue}
                        </p>
                        <p className="event-date">📅 {event.date}</p>
                        <p className="event-price">{event.price}</p>
                        <div className="event-tags-row">
                          {event.category.map((c: string) => (
                            <span className="cat-badge" key={c}>
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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
