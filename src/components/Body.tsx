import { Link } from "react-router-dom";
import { useMovies, useEvents, useCity } from "../context/AppContext";
import "./body.css";
export default function Body() {
  const movies = useMovies(),
    events = useEvents(),
    city = useCity();
  const featuredMovies = movies.cityMovies.slice(0, 6);
  const cityEvents = events.allEvents.filter(
    (e: any) => e.city === city.selectedCity,
  );
  const featuredEvents = (
    cityEvents.length >= 3 ? cityEvents : events.allEvents
  ).slice(0, 6);
  return (
    <div className="bms-body py-4">
      <section className="container mb-5">
        <div className="section-header d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold mb-0">Recommended Movies</h5>
            <span className="section-sub">
              Based on your city · {city.selectedCity}
            </span>
          </div>
          <Link to="/movies" className="see-all-link">
            See All ›
          </Link>
        </div>
        <div className="row g-3">
          {featuredMovies.map((m: any) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={m.id}>
              <Link to={`/movies/${m.id}`} className="text-decoration-none">
                <div className="bms-card">
                  <div className="card-poster-wrap">
                    <img src={m.poster} alt={m.title} className="card-poster" />
                    <span className="cert-pill">{m.certification}</span>
                    <div className="card-hover-bar">
                      <span className="hover-book-btn">Book Tickets</span>
                    </div>
                  </div>
                  <div className="card-meta">
                    <div className="rating-row">
                      <span className="star-icon">★</span>
                      <span className="rating-num">{m.rating}/10</span>
                      <span className="votes-txt">· {m.votes}</span>
                    </div>
                    <p className="card-title">{m.title}</p>
                    <p className="card-genre">{m.genre.join(" / ")}</p>
                    <div className="lang-pills">
                      {m.language.slice(0, 2).map((l: string) => (
                        <span className="lang-pill" key={l}>
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="container mb-5">
        <div className="premiere-banner d-flex align-items-center justify-content-between px-4 py-3 rounded">
          <div>
            <p className="premiere-label mb-1">🎬 BookMyShow Stream</p>
            <h5 className="premiere-title mb-0">
              Watch the latest premieres at home
            </h5>
          </div>
          <Link to="/stream" className="btn btn-light btn-sm fw-semibold px-3">
            Explore Now
          </Link>
        </div>
      </section>
      <section className="container mb-5">
        <div className="section-header d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="fw-bold mb-0">The Best Of Live Events</h5>
            <span className="section-sub">Concerts, Comedy, Sports & more</span>
          </div>
          <Link to="/events" className="see-all-link">
            See All ›
          </Link>
        </div>
        <div className="row g-3">
          {featuredEvents.map((e: any) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={e.id}>
              <Link to="/events" className="text-decoration-none">
                <div className="bms-card">
                  <div className="card-poster-wrap">
                    <img
                      src={e.banner}
                      alt={e.name}
                      className="card-poster event-img"
                    />
                    {e.tag && (
                      <span
                        className={
                          "event-tag-pill " +
                          (e.tag === "Selling Fast"
                            ? "pill-hot"
                            : e.tag === "New"
                              ? "pill-new"
                              : "")
                        }
                      >
                        {e.tag}
                      </span>
                    )}
                    <div className="card-hover-bar">
                      <span className="hover-book-btn">Book Now</span>
                    </div>
                  </div>
                  <div className="card-meta">
                    <p className="card-title">{e.name}</p>
                    <p className="card-genre">
                      📍 {e.city} · {e.venue}
                    </p>
                    <p className="card-genre">📅 {e.date}</p>
                    <p className="event-price">{e.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <div className="container mb-4">
        <div className="plays-cta-row d-flex gap-3 flex-wrap">
          {[
            [
              "🎭",
              "Plays & Theatre",
              "Drama, Comedy, musicals and more",
              "/plays",
            ],
            ["🏏", "Sports", "IPL, Kabaddi, Football & more", "/sports"],
            [
              "🎵",
              "Music & Festivals",
              "Concerts, DJ nights, tours",
              "/activities",
            ],
          ].map(([icon, t, s, to]) => (
            <div className="plays-cta-card flex-fill" key={t}>
              <span className="plays-emoji">{icon}</span>
              <div>
                <p className="plays-cta-title">{t}</p>
                <p className="plays-cta-sub">{s}</p>
              </div>
              <Link to={to} className="btn btn-sm btn-outline-danger ms-auto">
                Explore
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
