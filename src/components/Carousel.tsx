import { useEffect, useState } from "react";
import "./carousal.css";
export default function Carousel() {
  const [i, setI] = useState(0);
  const imgs = [1, 2, 3, 4];
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % imgs.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bms-carousel carousel slide">
      <div className="carousel-indicators">
        {imgs.map((_, n) => (
          <button
            key={n}
            className={n === i ? "active" : ""}
            onClick={() => setI(n)}
            aria-label={`Slide ${n + 1}`}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {imgs.map((n) => (
          <div
            key={n}
            className={"carousel-item " + (n - 1 === i ? "active" : "")}
          >
            <img
              src={`/images/carousel-${n}.png`}
              className="d-block w-100 carousel-img"
              alt={`Banner ${n}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        onClick={() => setI((i - 1 + 4) % 4)}
      >
        <span className="carousel-control-prev-icon" />
      </button>
      <button
        className="carousel-control-next"
        onClick={() => setI((i + 1) % 4)}
      >
        <span className="carousel-control-next-icon" />
      </button>
    </div>
  );
}
