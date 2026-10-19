import React, { useState } from "react";
import { login, register } from "../api";
import { useAuth } from "../context/AuthContext";

export default function AuthModal() {
  const { isAuthOpen, closeAuth, login: setAuthUser } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        await register({ username, email, password });
      }
      const res = await login({ username, password });
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      localStorage.setItem("username", username);

      setAuthUser(username);
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        JSON.stringify(err.response?.data) ||
        "An error occurred. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box relative max-w-sm border border-base-300 shadow-2xl">
        <button
          onClick={closeAuth}
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-base-content/70 hover:text-base-content"
        >
          ✕
        </button>
        
        <h3 className="font-bold text-xl mb-4">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h3>

        {error && (
          <div className="alert alert-error py-2 text-sm mb-4 shadow">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-medium">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input input-bordered w-full input-sm sm:input-md"
            />
          </div>

          {isRegister && (
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full input-sm sm:input-md"
              />
            </div>
          )}

          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full input-sm sm:input-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-3 shadow"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : isRegister ? (
              "Sign Up"
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-xs text-base-content/70">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="link link-primary font-semibold ml-1"
          >
            {isRegister ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60" onClick={onClose}></div>
    </div>
  );
}