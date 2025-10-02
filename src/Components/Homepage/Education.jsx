import React from "react";
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

export default function Education() {
  return (
    <div className="flex justify-center">
      <div className="text-white w-[90vh]">
        <div className="grid grid-cols-3 grid-row-3 gap-5 m-10 grid-flow-row-dense">
          <div className="bg-zinc-800 p-5 col-span-2 p-10 rounded-lg flex flex-col gap-2 transition ease hover:scale-101">
            <h1 className="text-3xl font-bold">About me</h1>
            <p className="opacity-70 text-base">
              Hello everyone! My name is Luis-Angel Moreno, I am currently a
              junior at Florida International University pursuing a Bachelors in
              Computer Science. I had the pleasure during the summer of 2025, to
              intern at Salesforce in San Francisco through their FTL program.
            </p>
          </div>
          <div className="bg-zinc-800 p-5 row-span-2 gap-3 rounded-lg transition ease hover:scale-101">
            <h1 className="text-3xl font-bold">
              Technologies I have worked with
            </h1>
            <div className="flex flex-row flex-wrap justify-center gap-3 mt-10">
              <SiReact size={64} color="#ffffffff" className="opacity-70" />
              <SiPrisma size={64} color="#ffffffff" className="opacity-70" />
              <SiVite size={64} color="#ffffffff" className="opacity-70" />
              <SiPostgresql
                size={64}
                color="#ffffffff"
                className="opacity-70"
              />
              <SiExpress size={64} color="#ffffffff" className="opacity-70" />
              <IoLogoNodejs
                size={64}
                color="#ffffffff"
                className="opacity-70"
              />
              <SiTailwindcss
                size={64}
                color="#ffffffff"
                className="opacity-70"
              />
              <FaJava size={64} color="#ffffffff" className="opacity-70" />
            </div>
          </div>
          <div className="bg-zinc-800 p-5 row-span-2 rounded-lg transition ease hover:scale-101 group">
            <img
              src={codeyTheBearPicture}
              alt="codeyTheBearPic"
              className="rounded-lg cursor-pointer group-hover:opacity-50 transition ease-in-out"
            />
          </div>
          <div className="bg-zinc-800 p-5 rounded-lg transition ease hover:scale-101 flex flex-row justify-center items-center">
            <h1 className="text-3xl font-bold text-sky-400">
              Software Developer
            </h1>
          </div>
          <div className="bg-zinc-800 p-5 col-span-2 rounded-lg transition ease hover:scale-101">
            <h1 className="text-3xl font-bold">Education</h1>
            <div className="mt-4 flex flex-col gap-1">
              <h2 className="text-lg">
                Florida International University{" "}
                <span className="text-base opacity-70">(2023-Today)</span>
              </h2>
              <p className="opacity-70">
                Currently attending Florida International University, completing
                a BA in Computer Science.
              </p>
            </div>
            <div className="mt-4 w-full flex flex-col gap-1">
              <h2 className="text-lg">Coursework</h2>
              <p className="text-base opacity-70">
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
