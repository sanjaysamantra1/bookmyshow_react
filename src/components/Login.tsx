import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import "./login.css";
export default function Login() {
  const auth = useAuth(),
    nav = useNavigate();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState("");
  const submit = () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (auth.login(email, password)) nav("/");
    else setError("Invalid email or password.");
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="text-center">
          <img
            src="/images/bms-logo.png"
            alt="BookMyShow"
            className="auth-logo"
          />
          <h4 className="auth-title">Welcome back!</h4>
          <p className="auth-sub">
            Sign in to access your bookings & preferences
          </p>
        </div>
        {error && (
          <div className="alert alert-danger py-2 small rounded-3 mb-3">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button className="btn-bms" onClick={submit}>
          Sign In
        </button>
        <p className="auth-footer-text">
          Don't have an account? <Link to="/register">Create one free</Link>
        </p>
      </div>
    </div>
  );
}
