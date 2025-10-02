import * as React from "react";
import { useState, useEffect } from "react";
import MainScreen from "./Components/MainScreen";
import TopNavbar from "./Components/TopNavbar";
import Personal from "./Components/Personal";
import Education from "./Components/Education";

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

      {/* ACTUAL COMPONENTS BEING RENDERED */}
      <div className="flex justify-center m-5 relative z-10">
        <TopNavbar />
      </div>
      <div className="relative z-10">
        <Personal />
      </div>
      <div className="mt-10 relative z-10">
        <Education />
      </div>
    </div>
  );
}
