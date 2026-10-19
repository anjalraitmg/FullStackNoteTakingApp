import React from "react";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { username, openAuth, logout } = useAuth();
  const initial = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-8 py-2.5">
        <div className="flex-1 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl shadow-inner">
            📝
          </div>
          <span className="text-xl font-bold tracking-tight text-base-content">
            Note<span className="text-primary">Nest</span>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          {username ? (
            <>
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-base-200 border border-base-300/80">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-content flex items-center justify-center text-xs font-bold shadow-sm">
                  {initial}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] leading-none text-base-content/60 hidden sm:block">
                    Signed in as
                  </span>
                  <span className="text-xs sm:text-sm font-semibold leading-tight text-base-content max-w-[90px] sm:max-w-[140px] truncate">
                    {username}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="btn btn-outline btn-error btn-sm rounded-lg hover:shadow-sm transition-all"
                title="Log out of NoteNest"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={openAuth}
              className="btn btn-primary btn-sm rounded-lg px-4 shadow-sm hover:shadow-md transition-all"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}