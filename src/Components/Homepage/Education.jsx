import React, { useEffect, useState } from "react";
import {
  SiReact,
  SiPrisma,
  SiVite,
  SiPostgresql,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import { FaJava } from "react-icons/fa";
import codeyTheBearPicture from "../../assets/image.jpg";
import { useNavigate } from "react-router-dom";

export default function Education({ color }) {
  const navigate = useNavigate();
  const [iconColor, setIconColor] = useState("#ffffffff");

  useEffect(() => {
    if (color === "Moon") {
      setIconColor("#ffffffff");
    } else {
      setIconColor("#3B3B3B");
    }
  }, [color]);

  const handleSFNav = () => {
    navigate("/summer");
  };

  return (
    <div className="flex justify-center px-4 sm:px-0">
      <div className="w-full max-w-[90vw] sm:w-[100vh]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 m-4 sm:m-10">
          {/* About me - spans 2 columns on desktop */}
          <div
            className={`${
              color === "Moon"
                ? "bg-zinc-900 border-1 border-gray-600/10 hover:border-gray-600/40"
                : "bg-zinc-100 border-1 border-gray-300 hover:border-gray-400"
            } p-5 sm:p-10 sm:col-span-2 lg:col-span-2 rounded-lg flex flex-col gap-2 transition ease hover:scale-102`}
          >
            <h1 className="text-2xl sm:text-3xl font-bold">About me</h1>
            <p className="opacity-70 text-sm sm:text-base">
              Hello everyone! My name is Luis-Angel Moreno, I am currently a
              junior at Florida International University pursuing a Bachelors in
              Computer Science. I had the pleasure during the summer of 2025, to
              intern at Salesforce in San Francisco through their FTL program.
            </p>
          </div>

          {/* Technologies - spans 1 column on mobile, 2 rows on desktop */}
          <div
            className={`${
              color === "Moon"
                ? "bg-zinc-900 border-1 border-gray-600/10 hover:border-gray-600/40"
                : "bg-zinc-100 border-1 border-gray-300 hover:border-gray-400"
            } p-5 sm:row-span-2 gap-3 rounded-lg transition ease hover:scale-102`}
          >
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Technologies I have worked with
            </h1>
            <div className="flex flex-row flex-wrap justify-center gap-2 sm:gap-3 mt-5 sm:mt-10">
              <SiReact
                size={40}
                color={iconColor}
                className="opacity-70 sm:w-[52px] sm:h-[52px]"
              />
              <SiPrisma
                size={40}
                color={iconColor}
                className="opacity-70 sm:w-[52px] sm:h-[52px]"
              />
              <SiVite
                size={40}
                color={iconColor}
                className="opacity-70 sm:w-[52px] sm:h-[52px]"
              />
              <SiPostgresql
                size={40}
                color={iconColor}
                className="opacity-70 sm:w-[52px] sm:h-[52px]"
              />
              <SiExpress
                size={40}
                color={iconColor}
                className="opacity-70 sm:w-[52px] sm:h-[52px]"
              />
              <IoLogoNodejs
                size={40}
                color={iconColor}
                className="opacity-70 sm:w-[52px] sm:h-[52px]"
              />
              <SiTailwindcss
                size={40}
                color={iconColor}
                className="opacity-70 sm:w-[52px] sm:h-[52px]"
              />
              <FaJava
                size={40}
                color={iconColor}
                className="opacity-70 sm:w-[52px] sm:h-[52px]"
              />
            </div>
          </div>

          {/* Summer 2025 Card - spans 1 column, 2 rows on desktop */}
          <div
            className={`${
              color === "Moon"
                ? "bg-zinc-900 border-1 border-gray-600/10 hover:border-gray-600/40"
                : "bg-zinc-100 border-1 border-gray-300 hover:border-gray-400"
            } p-5 sm:row-span-2 rounded-lg transition ease hover:scale-102 flex justify-center items-center cursor-pointer`}
          >
            <div className="flex flex-col gap-3" onClick={handleSFNav}>
              <img
                src={codeyTheBearPicture}
                alt="picture of me with cody the bear at the Salesforce SF tower"
                className="h-[300px] sm:h-[250px] object-cover rounded-md"
              />
              <div className="flex flex-col items-center">
                <h1 className="text-base sm:text-lg font-bold">Summer 2025</h1>
                <h1 className="text-sm sm:text-md opacity-60">
                  A dive into my time in SF
                </h1>
              </div>
            </div>
          </div>

          {/* Software Developer */}
          <div
            className={`${
              color === "Moon"
                ? "bg-zinc-900 border-1 border-gray-600/10 hover:border-gray-600/40"
                : "bg-zinc-100 border-1 border-gray-300 hover:border-gray-400"
            } p-5 rounded-lg transition ease hover:scale-102 flex flex-row justify-center items-center`}
          >
            <h1 className="text-lg sm:text-xl font-bold text-sky-400">
              Software Developer
            </h1>
          </div>

          {/* Education - spans 2 columns on desktop */}
          <div
            className={`${
              color === "Moon"
                ? "bg-zinc-900 border-1 border-gray-600/10 hover:border-gray-600/40"
                : "bg-zinc-100 border-1 border-gray-300 hover:border-gray-400"
            } p-5 sm:col-span-2 lg:col-span-2 rounded-lg transition ease hover:scale-102`}
          >
            <h1 className="text-2xl sm:text-3xl font-bold">Education</h1>
            <div className="mt-4 flex flex-col gap-1">
              <h2 className="text-base sm:text-lg">
                Florida International University{" "}
                <span className="text-sm sm:text-base opacity-70">
                  (2023-Today)
                </span>
              </h2>
              <p className="opacity-70 text-sm sm:text-base">
                Currently attending Florida International University, completing
                a BS in Computer Science.
              </p>
            </div>
            <div className="mt-4 w-full flex flex-col gap-1">
              <h2 className="text-base sm:text-lg">Coursework</h2>
              <p className="text-sm sm:text-base opacity-70">
                Data Structures & Algorithms, Systems Programming, Artificial
                Intelligence Algorithms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
