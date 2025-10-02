import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TopNavbar() {
  // const [activeOpt, setActiveOpt] = useState();
  const navigate = useNavigate();

  const getCurrentOpt = () => {
    if (location.pathname === "/") return "Home";
    if (location.pathname === "/Experience") return "Experience";
    if (location.pathname === "/Projects") return "Projects";
  };

  const activeOpt = getCurrentOpt();

  const clickedOn = (currentState) => {
    // setActiveOpt(currentState);
    if (currentState == "Home") {
      navigate("/");
    } else {
      navigate(`/${currentState}`);
    }
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
          <motion.button
            className="text-sm font-semibold cursor-pointer bg-sky-600 px-4 py-2 rounded-3xl transition ease-in-out duration-300 "
            whileHover={{ scale: 1.05 }}
          >
            Home
          </motion.button>
        ) : (
          <motion.button
            className="text-sm font-semibold cursor-pointer px-4 py-2 rounded-3xl transition ease-in-out opacity-50 hover:opacity-100 duration-300 "
            onClick={() => clickedOn("Home")}
            whileHover={{ scale: 1.05 }}
          >
            Home
          </motion.button>
        )}

        {activeOpt == "Experience" ? (
          <motion.button
            className="text-sm font-semibold cursor-pointer bg-sky-600 px-4 py-2 rounded-3xl transition ease-in-out duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Experience
          </motion.button>
        ) : (
          <motion.button
            className="text-sm font-semibold cursor-pointer px-4 py-2  rounded-3xl transition ease-in-out opacity-50 hover:opacity-100 duration-300 "
            onClick={() => clickedOn("Experience")}
            whileHover={{ scale: 1.05 }}
          >
            Experience
          </motion.button>
        )}
        {activeOpt == "Projects" ? (
          <motion.button
            className="text-sm font-semibold cursor-pointer bg-sky-600 px-4 py-2 rounded-3xl transition ease-in-out duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Projects
          </motion.button>
        ) : (
          <motion.button
            className="text-sm font-semibold cursor-pointer px-4 py-2  rounded-3xl transition ease-in-out opacity-50 hover:opacity-100 duration-300 "
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
