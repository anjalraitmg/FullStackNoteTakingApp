import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Hero() {
  const { openAuth } = useAuth();

  return (
    <div className="hero min-h-[70vh]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-primary">NoteNest</span>
          </h1>
          <p className="py-6 text-base-content/70">
            A fast, clean place to organize your thoughts, ideas, and tasks.
            Backed by Django REST Framework and SQLite.
          </p>
          <button onClick={openAuth} className="btn btn-primary shadow-lg">
            Sign In to View Your Notes
          </button>
        </div>
      </div>
    </div>
  );
}