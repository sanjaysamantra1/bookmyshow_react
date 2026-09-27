import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth, useBookings } from "../context/AppContext";
import "./my-bookings.css";
export default function MyBookings() {
  const auth = useAuth(),
    b = useBookings(),
    nav = useNavigate();
  useEffect(() => {
    if (!auth.isLoggedIn) nav("/login");
  }, [auth.isLoggedIn, nav]);
  const cancel = (id: string) => {
    if (confirm("Cancel this booking?")) b.cancelBooking(id);
  };
  return (
    <div className="bookings-page container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold mb-0">My Bookings</h4>
        <Link to="/" className="btn-back-link">
          ← Home
        </Link>
      </div>
      {b.bookings.length === 0 ? (
        <div className="empty-state text-center py-5">
          <div className="empty-icon">🎟️</div>
          <h5 className="fw-bold mt-3 mb-2">No bookings yet</h5>
          <p className="text-muted mb-4">
            Looks like you haven't booked any tickets yet.
          </p>
          <Link to="/movies" className="btn-explore">
            Explore Movies
          </Link>
        </div>
      ) : (
        <div className="bookings-list">
          {b.bookings.map((x: any) => (
            <div
              className={
                "booking-item " + (x.status === "cancelled" ? "cancelled" : "")
              }
              key={x.id}
            >
              <div className="booking-left d-flex gap-3">
                <img
                  src={x.moviePoster}
                  className="booking-poster"
                  alt={x.movieTitle}
                />
                <div className="booking-info">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h6 className="booking-movie-title mb-0">{x.movieTitle}</h6>
                    <span
                      className={
                        "status-pill " +
                        (x.status === "confirmed"
                          ? "status-confirmed"
                          : "status-cancelled")
                      }
                    >
                      {x.status}
                    </span>
                  </div>
                  <p className="booking-meta">
                    🕐 {x.showTime.time} · {x.showTime.format}
                  </p>
                  <p className="booking-meta">📍 {x.showTime.venue}</p>
                  <p className="booking-meta">
                    🏙️ {x.city} · 📅 {x.bookedAt}
                  </p>
                  <div className="seats-summary">
                    {x.seats.map((s: any) => (
                      <span className="seat-tag" key={s.category}>
                        {s.category} × {s.count}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="booking-right text-end">
                <p className="booking-amount">
                  ₹{x.totalAmount.toLocaleString("en-IN")}
                </p>
                <p className="booking-id-text">{x.id}</p>
                {x.status === "confirmed" && (
                  <>
                    <Link
                      to={`/booking-confirmation/${x.id}`}
                      className="btn-view-ticket"
                    >
                      View Ticket
                    </Link>
                    <button className="btn-cancel" onClick={() => cancel(x.id)}>
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
