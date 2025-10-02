import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Homepage/HomePage";
import ExperiencePage from "./Components/ExperiencePage/ExperiencePage.jsx";
import ProjectsPage from "./Components/ProjectsPage/ProjectsPage.jsx";
import TopNavbar from "./Components/TopNavbar.jsx";

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Spotlight effect*/}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(
            600px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(59, 130, 246, 0.1),
            transparent 90%
          )`,
          mixBlendMode: "screen",
        }}
      />
      <div></div>
      <Router>
        <div className="flex justify-center m-5 relative z-10">
          <TopNavbar />
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Experience" element={<ExperiencePage />} />
          <Route path="/Projects" element={<ProjectsPage />} />
        </Routes>
      </Router>
    </div>
  );
}
