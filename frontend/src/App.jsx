import React from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import NotesSection from "./components/NotesSection";
import AuthModal from "./components/AuthModal";
import { AuthProvider, useAuth } from "./context/AuthContext";

function MainContent() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
      {isAuthenticated ? <NotesSection /> : <Hero />}
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-base-100 text-base-content">
        <NavBar />
        <MainContent />
        <AuthModal />
      </div>
    </AuthProvider>
  );
}