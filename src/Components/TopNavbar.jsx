import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TopNavbar({ color }) {
  const navigate = useNavigate();

  const getCurrentOpt = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/Experience") return "Experience";
    if (location.pathname === "/Projects") return "Projects";
  };

  const activeOpt = getCurrentOpt();

  const clickedOn = (currentState) => {
    if (currentState == "Home") {
      navigate("/");
    } else {
      navigate(`/${currentState}`);
    }
  };

  return (
    <>
      <div
        className={`${
          color === "Moon"
            ? "bg-zinc-800/10 border border-gray-600/30"
            : "bg-zinc-100 border border-gray-600/20"
        } flex flex-row gap-2 mr-3 sm:mr-2 md:mr-0 sm:gap-4 w-fit rounded-xl p-1.5 sm:p-2`}
      >
        {activeOpt == "Home" ? (
          <motion.button
            className="text-xs sm:text-sm font-semibold cursor-pointer bg-sky-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition ease-in-out duration-300 text-white"
            whileHover={{ scale: 1.05 }}
          >
            Home
          </motion.button>
        ) : (
          <motion.button
            className="text-xs sm:text-sm font-semibold cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition ease-in-out opacity-50 hover:opacity-100 duration-300"
            onClick={() => clickedOn("Home")}
            whileHover={{ scale: 1.05 }}
          >
            Home
          </motion.button>
        )}

        {activeOpt == "Experience" ? (
          <motion.button
            className="text-xs sm:text-sm font-semibold cursor-pointer bg-sky-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition ease-in-out duration-300 text-white"
            whileHover={{ scale: 1.05 }}
          >
            Experience
          </motion.button>
        ) : (
          <motion.button
            className="text-xs sm:text-sm font-semibold cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition ease-in-out opacity-50 hover:opacity-100 duration-300"
            onClick={() => clickedOn("Experience")}
            whileHover={{ scale: 1.05 }}
          >
            Experience
          </motion.button>
        )}

        {activeOpt == "Projects" ? (
          <motion.button
            className="text-xs sm:text-sm font-semibold cursor-pointer bg-sky-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition ease-in-out duration-300 text-white"
            whileHover={{ scale: 1.05 }}
          >
            Projects
          </motion.button>
        ) : (
          <motion.button
            className="text-xs sm:text-sm font-semibold cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition ease-in-out opacity-50 hover:opacity-100 duration-300"
            onClick={() => clickedOn("Projects")}
            whileHover={{ scale: 1.05 }}
          >
            Projects
          </motion.button>
        )}
      </div>
    </>
  );
}
