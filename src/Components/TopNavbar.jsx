import React, { useState } from "react";

export default function TopNavbar() {
  const [activeOpt, setActiveOpt] = useState("Home");

  const clickedOn = (currentState) => {
    setActiveOpt(currentState);
  };

  return (
    <>
      <div
        className="text-white flex flex-row gap-4 bg-stone-800 w-fit rounded-3xl p-2 outline outline-1 outline-gray-600"
        style={{
          boxShadow:
            "0 0 15px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.1)",
        }}
      >
        {activeOpt == "Home" ? (
          <button className="text-sm font-semibold cursor-pointer bg-sky-600 px-4 py-2 rounded-3xl transition ease">
            Home
          </button>
        ) : (
          <button
            className="text-sm font-semibold cursor-pointer px-4 py-2 hover:bg-sky-600 rounded-3xl transition ease opacity-50 hover:opacity-100"
            onClick={() => clickedOn("Home")}
          >
            Home
          </button>
        )}

        {activeOpt == "Experience" ? (
          <button className="text-sm font-semibold cursor-pointer bg-sky-600 px-4 py-2 rounded-3xl transition ease">
            Experience
          </button>
        ) : (
          <button
            className="text-sm font-semibold cursor-pointer px-4 py-2 hover:bg-sky-600 rounded-3xl transition ease opacity-50 hover:opacity-100"
            onClick={() => clickedOn("Experience")}
          >
            Experience
          </button>
        )}
        {activeOpt == "Projects" ? (
          <button className="text-sm font-semibold cursor-pointer bg-sky-600 px-4 py-2 rounded-3xl transition ease">
            Projects
          </button>
        ) : (
          <button
            className="text-sm font-semibold cursor-pointer px-4 py-2 hover:bg-sky-600 rounded-3xl transition ease opacity-50 hover:opacity-100"
            onClick={() => clickedOn("Projects")}
          >
            Projects
          </button>
        )}
      </div>
    </>
  );
}
