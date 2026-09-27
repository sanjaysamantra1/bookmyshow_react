import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAuth,
  useBookings,
  useCity,
  useMovies,
  SHOW_TIMES,
  SEAT_CATEGORIES,
} from "../context/AppContext";
import "./seat-selection.css";
export default function SeatSelection() {
  const { id } = useParams(),
    nav = useNavigate(),
    auth = useAuth(),
    m = useMovies(),
    booking = useBookings(),
    city = useCity();
  const movie = m.allMovies.find((x: any) => x.id === Number(id));
  const [selectedShow, setShow] = useState<any>(null),
    [counts, setCounts] = useState<Record<string, number>>({}),
    [step, setStep] = useState<"showtime" | "seats" | "payment">("showtime"),
    [method, setMethod] = useState<"card" | "upi" | "wallet">("card"),
    [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState(""),
    [cardName, setCardName] = useState(""),
    [expiry, setExpiry] = useState(""),
    [cvv, setCvv] = useState(""),
    [upi, setUpi] = useState("");
  useEffect(() => {
    if (!auth.isLoggedIn) nav("/login");
  }, [auth.isLoggedIn, nav]);
  const breakdown = useMemo(
    () =>
      selectedShow
        ? SEAT_CATEGORIES.filter((c) => (counts[c.category] || 0) > 0).map(
            (c) => ({
              category: c.category,
              count: counts[c.category],
              pricePerSeat: Math.round(selectedShow.price * c.multiplier),
            }),
          )
        : [],
    [selectedShow, counts],
  );
  const totalSeats = Object.values(counts).reduce((a, b) => a + b, 0),
    subtotal = breakdown.reduce((s, x) => s + x.count * x.pricePerSeat, 0),
    fee = Math.round(subtotal * 0.05),
    total = subtotal + fee;
  const inc = (c: string) => {
    if (totalSeats < 10) setCounts((x) => ({ ...x, [c]: (x[c] || 0) + 1 }));
  };
  const dec = (c: string) =>
    setCounts((x) => ({ ...x, [c]: Math.max(0, (x[c] || 0) - 1) }));
  const confirm = () => {
    if (!movie || !selectedShow) return;
    setProcessing(true);
    setTimeout(() => {
      const b = booking.createBooking({
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster,
        showTime: selectedShow,
        seats: breakdown,
        totalAmount: total,
        convenienceFee: fee,
        city: city.selectedCity,
      });
      setProcessing(false);
      nav(`/booking-confirmation/${b.id}`);
    }, 1200);
  };
  if (!movie)
    return (
      <div className="container py-5 text-center">
        <p>Movie not found.</p>
        <Link to="/movies">← Back to movies</Link>
      </div>
    );
  return (
    <div className="booking-page">
      <div className="booking-banner">
        <div
          className="banner-blur"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="banner-content container d-flex align-items-center gap-3 py-3">
          <img src={movie.poster} className="banner-poster" alt={movie.title} />
          <div>
            <h5 className="banner-title mb-1">{movie.title}</h5>
            <p className="banner-meta mb-0">
              {movie.genre.join(" · ")} · {movie.certification} ·{" "}
              {city.selectedCity}
            </p>
          </div>
        </div>
      </div>
      <div className="step-bar container py-3">
        <div className="steps d-flex gap-0">
          <div
            className={
              "step " +
              (step === "showtime" ? "active" : "") +
              (step !== "showtime" ? " done" : "")
            }
          >
            <span className="step-num">1</span>
            <span className="step-label">Show Time</span>
          </div>
          <div className="step-line" />
          <div
            className={
              "step " +
              (step === "seats" ? "active" : "") +
              (step === "payment" ? " done" : "")
            }
          >
            <span className="step-num">2</span>
            <span className="step-label">Select Seats</span>
          </div>
          <div className="step-line" />
          <div className={"step " + (step === "payment" ? "active" : "")}>
            <span className="step-num">3</span>
            <span className="step-label">Payment</span>
          </div>
        </div>
      </div>
      <div className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-8">
            {step === "showtime" && (
              <div className="booking-card">
                <h6 className="booking-card-title">Select Show Time</h6>
                <div className="showtime-grid">
                  {SHOW_TIMES.map((s) => (
                    <div
                      className={
                        "showtime-tile " +
                        (selectedShow?.id === s.id ? "selected" : "")
                      }
                      key={s.id}
                      onClick={() => setShow(s)}
                    >
                      <p className="show-time">{s.time}</p>
                      <p className="show-format">{s.format}</p>
                      <p className="show-venue">{s.venue}</p>
                      <p className="show-price">₹{s.price}</p>
                    </div>
                  ))}
                </div>
                <button
                  className="btn-primary-bms mt-4"
                  disabled={!selectedShow}
                  onClick={() => setStep("seats")}
                >
                  Continue to Seat Selection →
                </button>
              </div>
            )}
            {step === "seats" && (
              <div className="booking-card">
                <h6 className="booking-card-title">Select Seats</h6>
                <p className="text-muted small mb-4">
                  Max 10 seats per booking. Prices shown per seat.
                </p>
                <div className="screen-wrap">
                  <div className="screen-line" />
                  <p className="screen-label">SCREEN</p>
                </div>
                <div className="seat-categories">
                  {SEAT_CATEGORIES.map((c) => (
                    <div className="seat-cat-row" key={c.category}>
                      <div className="seat-cat-info">
                        <span className="seat-cat-name">{c.category}</span>
                        <span className="seat-cat-price">
                          ₹
                          {selectedShow
                            ? Math.round(selectedShow.price * c.multiplier)
                            : "—"}{" "}
                          per seat
                        </span>
                      </div>
                      <div className="seat-counter">
                        <button
                          className="counter-btn"
                          disabled={!counts[c.category]}
                          onClick={() => dec(c.category)}
                        >
                          −
                        </button>
                        <span className="counter-val">
                          {counts[c.category] || 0}
                        </span>
                        <button
                          className="counter-btn"
                          disabled={totalSeats >= 10}
                          onClick={() => inc(c.category)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex gap-2 mt-4">
                  <button
                    className="btn-outline-bms"
                    onClick={() => setStep("showtime")}
                  >
                    ← Back
                  </button>
                  <button
                    className="btn-primary-bms flex-fill"
                    disabled={!totalSeats}
                    onClick={() => setStep("payment")}
                  >
                    Proceed to Payment ({totalSeats} seat
                    {totalSeats !== 1 ? "s" : ""}) →
                  </button>
                </div>
              </div>
            )}
            {step === "payment" && (
              <div className="booking-card">
                <h6 className="booking-card-title">Payment</h6>
                <div className="pay-tabs mb-4">
                  {[
                    ["card", "💳 Card"],
                    ["upi", "📱 UPI"],
                    ["wallet", "👛 Wallet"],
                  ].map(([x, label]) => (
                    <button
                      key={x}
                      className={"pay-tab " + (method === x ? "active" : "")}
                      onClick={() => setMethod(x as any)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {method === "card" && (
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="pay-label">Card Number</label>
                      <input
                        className="pay-input"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div className="col-12">
                      <label className="pay-label">Cardholder Name</label>
                      <input
                        className="pay-input"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name on card"
                      />
                    </div>
                    <div className="col-6">
                      <label className="pay-label">Expiry</label>
                      <input
                        className="pay-input"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div className="col-6">
                      <label className="pay-label">CVV</label>
                      <input
                        className="pay-input"
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="•••"
                        maxLength={3}
                      />
                    </div>
                  </div>
                )}
                {method === "upi" && (
                  <div>
                    <label className="pay-label">UPI ID</label>
                    <input
                      className="pay-input"
                      value={upi}
                      onChange={(e) => setUpi(e.target.value)}
                      placeholder="yourname@upi"
                    />
                    <p className="text-muted small mt-2">
                      You will receive a payment request on your UPI app
                    </p>
                  </div>
                )}
                {method === "wallet" && (
                  <div className="wallet-options">
                    <div className="wallet-opt">📱 Paytm</div>
                    <div className="wallet-opt">💚 PhonePe</div>
                    <div className="wallet-opt">🔵 Amazon Pay</div>
                    <div className="wallet-opt">🟡 Mobikwik</div>
                  </div>
                )}
                <div className="d-flex gap-2 mt-4">
                  <button
                    className="btn-outline-bms"
                    onClick={() => setStep("seats")}
                  >
                    ← Back
                  </button>
                  <button
                    className="btn-primary-bms flex-fill"
                    onClick={confirm}
                    disabled={processing}
                  >
                    {processing
                      ? "Processing..."
                      : `Pay ₹${total.toLocaleString("en-IN")} Securely 🔒`}
                  </button>
                </div>
                <p className="secure-note mt-3">
                  🔒 256-bit SSL secured. Your payment info is safe.
                </p>
              </div>
            )}
          </div>
          <div className="col-lg-4">
            <div className="summary-card sticky-top" style={{ top: 80 }}>
              <h6 className="summary-title">Booking Summary</h6>
              <div className="summary-movie d-flex gap-3 mb-3">
                <img
                  src={movie.poster}
                  className="summary-poster"
                  alt={movie.title}
                />
                <div>
                  <p className="summary-movie-name">{movie.title}</p>
                  {selectedShow && (
                    <>
                      <p className="summary-detail">
                        🕐 {selectedShow.time} · {selectedShow.format}
                      </p>
                      <p className="summary-detail">📍 {selectedShow.venue}</p>
                    </>
                  )}
                </div>
              </div>
              {breakdown.length > 0 && (
                <>
                  <hr className="summary-divider" />
                  <div className="summary-seats">
                    {breakdown.map((s) => (
                      <div className="summary-row" key={s.category}>
                        <span>
                          {s.category} × {s.count}
                        </span>
                        <span>
                          ₹{(s.count * s.pricePerSeat).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <hr className="summary-divider" />
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="summary-row text-muted small">
                    <span>Convenience fee (5%)</span>
                    <span>₹{fee.toLocaleString("en-IN")}</span>
                  </div>
                  <hr className="summary-divider" />
                  <div className="summary-total">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
